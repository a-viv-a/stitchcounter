<h1 overflow="auto">stitchcounter<img src="/src/icons/favicon-128.png" align="left"/></h1>
A lightweight offline compatible stitch counter for the web. Using service workers, the entire page is cached when it is first viewed, at which point it no longer requires internet connection. And why should it? Keeping track of a few numbers is very simple, but popular alternatives always require on internet or heavy app installs. This requires neither, but does support PWA installation if you desire, although the experience is identical to the web experience. All stitch data is stored to local storage, so it should be persistent across reloads and reboots. Hosted with github pages, at https://stitchcount.xyz.

# screenshots
<table>
  <tr>
    <td>full size</td>
    <td>squished</td>
  </tr>
  <tr>
    <td width=700><img src="https://user-images.githubusercontent.com/72410860/114925962-9d2cdf00-9de4-11eb-8f28-d6fc09ef4c02.png"/></td>
    <td width=300><img src="https://user-images.githubusercontent.com/72410860/114926026-b2097280-9de4-11eb-9c19-35faced65ef7.png"/></td>
  </tr>
</table>

# development
Run the `./devserver.sh` script with npx installed, and the requisite files will be served locally on port 9000. While they are hosted for the entire network, service workers require a secure context, so they will not work anywhere other than `localhost:9000`. If you are making changes to any of the cached files (so any files as of the time of writing this), make sure to enable `bypass for network` in `application/service workers` in chrome dev tools, so you can see your new variant, not the cached version. Before merging to main, a dev branch must bump the version number in `sw.js` or the new version will not override the old, cached version. If you add text that uses unicode that is currently being stripped from the fonts, remember to add it to the bash. Pull Requests are welcome and encouraged.
