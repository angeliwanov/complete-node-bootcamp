console.log("Hello from the module"); // only executed upon module loading. On execution it will return just the cl below because of caching

module.exports = () => console.log("log this beautiful emoji");
