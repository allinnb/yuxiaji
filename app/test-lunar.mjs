import {Solar} from 'lunar-javascript';
const names=['大安','留连','速喜','赤口','小吉','空亡'];
const l=Solar.fromYmdHms(2026,4,21,8,0,0).getLunar();
const index=(3-1+5-1+4)%6;
if(names[index]!=='小吉') throw new Error('三月初五辰时应为小吉');
console.log('ok: 三月初五辰时 → 小吉');
