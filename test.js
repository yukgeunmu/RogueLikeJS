import { SkillManager } from "./Game/Manager/SkillManager.js";
import { SceneManager } from "./Game/Manager/SceneManager.js";
import { Player } from "./Game/Data/Player.js";


const skills = SkillManager.skillSelect();
const player = new Player('플레이어',100,100,5,5,5);
let buffskill;
let logs =[1,2,3];


logs = [];

console.log(logs.length);

