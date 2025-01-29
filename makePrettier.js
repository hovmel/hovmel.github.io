const fs = require("fs");
const prettier = require("prettier");

(async () => {
    try {
        // Path to your file
        const filePath = "./index.html";

        const removeScriptTags = (htmlContent) => {
            return htmlContent.replace(/<script[\s\S]*?<\/script>/gi, '');
        };

        // Read the file
        const content = fs.readFileSync(filePath, "utf-8");

        // Prettify the content
        const formatted = await prettier.format(content, {
            parser: "html", // Use "html" for HTML, CSS, and inline JS
            tabWidth: 2,
            useTabs: false,
        });

        // Write the formatted content back to the file
        fs.writeFileSync(filePath, removeScriptTags(formatted));

        console.log("File has been prettified!");
    } catch (err) {
        console.error("Error prettifying the file:", err);
    }
})();
