const fs = require("fs");
const fse = require("fs-extra");
const childProcess = require("child_process");

//Build client app
if (fs.existsSync("./build")) {
  fse.removeSync("./build");
}
childProcess.execSync("ng build", { stdio: "inherit" });

//Build backend app
fse.emptyDirSync('./publish');
childProcess.execSync("dotnet clean ./server /p:GenerateFullPaths=true /consoleloggerparameters:NoSummary", { stdio: "inherit" });
childProcess.execSync("dotnet publish ./server -c Release -o ./publish /p:GenerateFullPaths=true /consoleloggerparameters:NoSummary", { stdio: "inherit" });

//Move client
fse.moveSync("./build", "./publish/ClientApp/build", { overwrite: true });
