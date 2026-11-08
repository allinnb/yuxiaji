from pathlib import Path
import json,re,subprocess
root=Path(__file__).resolve().parents[1]; app=root/'app'; source=root/'font-source'; out=app/'public'/'fonts'; out.mkdir(parents=True,exist_ok=True)
text=''.join(p.read_text(encoding='utf-8') for p in (list((app/'src').glob('*.tsx'))+[app/'src'/'data.json']))
chars=''.join(sorted(set(re.findall(r'[\u3400-\u9fff]',text))))+'，。、“”《》：；！？（）—·↗四纵五横ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789：/·'
for src,name in [(source/'LXGWWenKai-Regular.ttf','LXGW-WenKai'),(source/'MaShanZheng-Regular.ttf','MaShan-Zheng')]:
  subprocess.run([r'C:\Users\heyia\AppData\Roaming\Python\Python314\Scripts\pyftsubset.exe',str(src),f'--output-file={out/name}.woff2','--flavor=woff2',f'--text={chars}','--layout-features=*','--glyph-names','--symbol-cmap'],check=True)
  print(name,(out/f'{name}.woff2').stat().st_size,'bytes',len(chars),'chars')
