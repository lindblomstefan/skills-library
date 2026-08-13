export function parseYaml(text) {
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((raw) => {
      const withoutComment = stripComment(raw);
      return {
        indent: withoutComment.match(/^ */)?.[0].length ?? 0,
        text: withoutComment.trimEnd()
      };
    })
    .filter((line) => line.text.trim() !== "");

  let index = 0;

  function parseBlock(indent) {
    const current = lines[index];
    if (!current || current.indent < indent) return null;
    if (current.text.trimStart().startsWith("- ")) return parseArray(indent);
    return parseObject(indent);
  }

  function parseObject(indent) {
    const object = {};
    while (index < lines.length) {
      const line = lines[index];
      if (line.indent < indent) break;
      if (line.indent > indent) {
        index += 1;
        continue;
      }
      const text = line.text.trim();
      if (text.startsWith("- ")) break;
      const split = splitKeyValue(text);
      if (!split) {
        index += 1;
        continue;
      }
      index += 1;
      object[split.key] = parseValue(split.value, indent + 2);
    }
    return object;
  }

  function parseArray(indent) {
    const array = [];
    while (index < lines.length) {
      const line = lines[index];
      if (line.indent !== indent || !line.text.trim().startsWith("- ")) break;
      const itemText = line.text.trim().slice(2).trim();
      index += 1;
      if (itemText === "") {
        array.push(parseBlock(indent + 2));
        continue;
      }
      const split = splitKeyValue(itemText);
      if (!split) {
        array.push(parseScalar(itemText));
        continue;
      }
      const object = {};
      object[split.key] = parseValue(split.value, indent + 2);
      while (index < lines.length && lines[index].indent === indent + 2 && !lines[index].text.trim().startsWith("- ")) {
        const child = splitKeyValue(lines[index].text.trim());
        index += 1;
        if (!child) continue;
        object[child.key] = parseValue(child.value, indent + 4);
      }
      array.push(object);
    }
    return array;
  }

  function parseValue(value, indent) {
    if (value === "") return parseBlock(indent);
    if (value === ">") return parseFolded(indent);
    return parseScalar(value);
  }

  function parseFolded(indent) {
    const parts = [];
    while (index < lines.length && lines[index].indent >= indent) {
      parts.push(lines[index].text.trim());
      index += 1;
    }
    return parts.join(" ").trim();
  }

  return parseBlock(0);
}

function stripComment(raw) {
  let quote = null;
  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i];
    if ((char === "\"" || char === "'") && raw[i - 1] !== "\\") {
      quote = quote === char ? null : quote ?? char;
    }
    if (char === "#" && !quote && (i === 0 || raw[i - 1] === " ")) {
      return raw.slice(0, i);
    }
  }
  return raw;
}

function splitKeyValue(text) {
  const match = text.match(/^([^:]+):(?:\s+(.*)|)$/);
  if (!match) return null;
  return { key: match[1].trim(), value: (match[2] ?? "").trim() };
}

function parseScalar(value) {
  if (value === "null") return null;
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "[]") return [];
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}
