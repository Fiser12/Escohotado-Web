import jsep from "jsep";

export function evaluateExpression(
  expression: string,
  tags: string[]
): boolean {
  const normalizedExpression = expression.toLowerCase();
  const parsedExpression = jsep(normalizedExpression);

  function evaluateNode(node: jsep.Expression): boolean {
    switch (node.type) {
      case "BinaryExpression":
        const left = evaluateNode(node.left as jsep.Expression);
        const right = evaluateNode(node.right as jsep.Expression);
        switch (node.operator) {
          case "&&":
            return left && right;
          case "||":
            return left || right;
          default:
            throw new Error(`Operador desconocido: ${node.operator}`);
        }
      case "UnaryExpression":
        const argument = evaluateNode(node.argument as jsep.Expression);
        switch (node.operator) {
          case "!":
            return !argument;
          default:
            throw new Error(`Operador desconocido: ${node.operator}`);
        }
      case "Identifier":
        return tags.includes(node.name as string);

      case "Literal":
        // Maneja literales de cadena
        if (typeof node.value === "string") {
          return tags.includes(node.value.toLowerCase());
        }
        throw new Error(`Literal no soportado: ${node.value}`);

      default:
        throw new Error(`Tipo de nodo desconocido: ${node.type}`);
    }
  }

  try {
    return evaluateNode(parsedExpression);
  } catch (error) {
    console.error(`Error al evaluar la expresión: ${error}`);
    return false;
  }
}
