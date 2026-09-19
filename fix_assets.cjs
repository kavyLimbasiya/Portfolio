const fs = require('fs');
let code = fs.readFileSync('src/data/portfolioData.ts', 'utf8');

if (!code.includes("import { getAssetUrl }")) {
  code = `import { getAssetUrl } from '../utils/assetHelper';\n` + code;
}

code = code.replace(/('|")\/?assets\/([^'"]+)\1/g, function(match, quote, p2, offset, string) {
   // Check if it's already wrapped
   const before = string.substring(Math.max(0, offset - 12), offset);
   if (before.includes('getAssetUrl(')) {
       return match;
   }
   return `getAssetUrl(${match})`;
});

fs.writeFileSync('src/data/portfolioData.ts', code);
console.log("Updated portfolioData.ts");
