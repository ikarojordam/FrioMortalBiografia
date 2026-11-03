# FrioMortal — Digital Identity

Site de perfil 100% estático, criado para publicar no **Render (Static Site)** e editar pelo GitHub. Design responsivo com gradientes azul escuro, branco e preto, fundo em GIF, animações, biografia, especialidades, links e música em loop.

## 1. Arquivos do projeto

```text
frio-mortal-profile/
├── index.html                ← página principal
├── style.css                 ← cores, animações e responsividade
├── script.js                 ← interatividade e áudio em loop
├── favicon.svg               ← ícone da aba
├── README.md                 ← instruções
└── assets/
    ├── links.js              ← EDITE AQUI TODOS OS LINKS
    ├── LEIA-ME-ASSETS.txt     ← lista de arquivos a adicionar
    ├── perfil.png             ← você adiciona
    ├── fundo.gif              ← você adiciona
    ├── icone-spotify.png      ← você adiciona
    ├── icone-discord.png      ← você adiciona
    ├── icone-frio-painel.png  ← você adiciona
    └── 300-no-7.mp3          ← você adiciona, com permissão de uso
```

Os arquivos de mídia pessoais não vêm no ZIP. O site usa aparência alternativa enquanto as imagens não forem adicionadas.

## 2. Adicionar suas imagens, GIF e música

No repositório do GitHub, entre na pasta `assets` e envie os arquivos com **os nomes exatos**:

- `perfil.png` — sua foto
- `fundo.gif` — fundo animado
- `icone-spotify.png` — ícone Spotify
- `icone-discord.png` — ícone Discord
- `icone-frio-painel.png` — ícone Frio Painel
- `300-no-7.mp3` — arquivo de áudio que você possui e pode usar

> A música foi identificada pelo nome “300 no 7”, mas o áudio não está incluído. Não é possível distribuí-lo sem o arquivo e os direitos correspondentes.

## 3. Adicionar links

Abra **`assets/links.js`** no GitHub. Use o ícone de lápis para editar este objeto:

```js
window.FRIO_LINKS = {
  meuSite: "https://exemplo.com",
  spotify: "https://open.spotify.com/...",
  discord: "https://discord.gg/...",
  frioPainel: "https://exemplo.com/painel",
  scriptEspAimbot: "https://github.com/usuario/repositorio"
};
```

Troque apenas os valores entre aspas. Os nomes das chaves devem permanecer iguais. Enquanto alguma URL estiver vazia, o cartão mostra uma mensagem explicando onde configurar.

## 4. Publicar gratuitamente no Render

1. Crie um repositório novo no GitHub e envie **todos os arquivos**, mantendo `assets/`.
2. Abra [https://dashboard.render.com](https://dashboard.render.com) e selecione **New > Static Site**.
3. Conecte sua conta do GitHub e escolha o repositório.
4. Configure:
   - **Build Command:** deixe vazio (não há build).
   - **Publish Directory:** `.` (um ponto — a raiz do repositório).
   - **Branch:** `main` (ou a branch em que os arquivos estiverem).
5. Crie o Static Site. O Render publicará o `index.html`.
6. Nas próximas alterações em `assets/links.js` ou nas imagens, faça commit no GitHub; o Render poderá republicar automaticamente.

Se você colocar o projeto dentro de uma subpasta do repositório, configure o **Root Directory** para essa pasta, e use Publish Directory `.`.

## 5. Música em loop: importante

- O site usa um elemento `<audio autoplay loop>` invisível, **sem botões para pausar, pular ou trocar música**.
- O script tenta iniciar assim que a página abre. Se Chrome, Safari ou outro navegador bloquear o autoplay com som, a **primeira interação** (um toque/clique em qualquer lugar) permite iniciar.
- Isso é uma regra de segurança dos navegadores e não pode ser ignorado por código de site estático.
- Depois de liberado, o áudio repete enquanto o navegador mantiver a página ativa. Ao fechar a aba, bloquear o aparelho ou sair do site, o sistema pode interromper o áudio.
- Para trocar a música, substitua `assets/300-no-7.mp3` por outro MP3 com o mesmo nome, ou altere o atributo `src` da tag `<audio>` em `index.html`.
- O volume padrão é `0.65` (65%). Para mudar, procure `music.volume = 0.65` em `script.js`.

## 6. Personalização

- **Biografia e textos:** `index.html`, procure `id="sobre"`.
- **Cores e efeitos:** `style.css`, no início (`:root`).
- **Imagem de perfil, GIF e ícones:** pasta `assets`.
- **Links:** apenas `assets/links.js`.
- **Créditos:** rodapé do `index.html` — `DESIGN & DESENVOLVIMENTO BY FRIOMORTAL`.

**Créditos:** Design e desenvolvimento por FrioMortal.
