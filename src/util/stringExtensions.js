export function extendStringPrototype () {
  String.prototype.toSentenceCase = function () {
    const result = this.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
}
