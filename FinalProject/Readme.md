2.	Install database and start the server:

-	Open `cmd` at `FinalProject` folder and enter command:

`dotnet-ef database update -s FinalProject -p DataModels`

to install database.

-	Open cmd at FinalProject inside FinalProject folder and enter command: 

`dotnet build -c Release`

to compile the code.

-	Open cmd at the compile folder (bin\Release\netcoreapp3.1\) and enter command:

`dotnet FinalProject.dll`

to start the server.
