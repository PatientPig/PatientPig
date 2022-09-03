module.exports = {
  extends: "universe",
  plugins: ["react-hooks"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [["builtin", "external", "internal"]],
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useRecoilCallback|useRecoilTransaction_UNSTABLE)",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
