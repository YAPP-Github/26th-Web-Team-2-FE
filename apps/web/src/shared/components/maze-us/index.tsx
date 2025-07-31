import Script from "next/script";

const MazeUs = () => {
  return (
    <Script id="maze-us" strategy="beforeInteractive">
      {`(function (m, a, z, e) {
          var s, t;
          try {
            t = m.sessionStorage.getItem('maze-us');
          } catch (err) {}

          if (!t) {
            t = Date.now();
            try {
              m.sessionStorage.setItem('maze-us', t);
            } catch (err) {}
          }

          s = a.createElement('script');
          s.src = z + '?apiKey=' + e;
          s.async = true;
          a.getElementsByTagName('head')[0].appendChild(s);
          m.mazeUniversalSnippetApiKey = e;
        })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '391259ac-78a9-4e9c-a970-06317d6fc17e');`}
    </Script>
  );
};

export default MazeUs;
