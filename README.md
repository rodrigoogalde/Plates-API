# Plates-API

```bash
yarn sequelize-cli model:generate --name Plate --attributes site:string,plate:string,brand:string,model:string,owner:string,color:string

yarn sequelize-cli model:generate --name Site --attributes name:string

yarn sequelize-cli model:generate --name Brand --attributes name:string

yarn sequelize-cli model:generate --name Entry --attributes id_computer:string,id_camera:string,plate:string,timestamp:date,confidence:float,id_list:string,id_lane:string
```