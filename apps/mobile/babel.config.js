module.exports = function getBabelConfig(api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@app": "./src/app",
            "@entities": "./src/entities",
            "@features": "./src/features",
            "@pages": "./src/pages",
            "@polite/data": "../../packages/data",
            "@polite/shared/lib": "../../packages/shared/src/lib",
            "@polite/shared/types": "../../packages/shared/src/types",
            "@shared": "./src/shared",
            "@widgets": "./src/widgets",
          },
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
      ],
    ],
  };
};
