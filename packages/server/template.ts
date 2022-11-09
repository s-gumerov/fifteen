export const generateTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Пятнашки</title>
  </head>
  <body>
    <div id="root">${content}</div>
    <script type="module" src="main.tsx"></script>
  </body>
</html>
`;