# Main website for ETA
This is the repository for ETAs main website at eta.chalmers.se. The website is built using the framework [Hugo](https://gohugo.io/). Hugo is a static site generatator that generates the website using Markdown and Go. This website is served by Chalmers Student Unions webservers which mirrors the generated site which is uploaded in the seperate branch "deploy".

The website uses a modified theme called "Universal theme" made by [Bootstrapious](http://bootstrapious.com/free-templates) and ported to Hugo by [DevCows](https://github.com/devcows/hugo-universal-theme). The theme have been extedended to have support for an auction catalogue and various smaller modification have been made.

Due to the limitations that comes with having an static website, some parts of the website may be hard to understand. But the site works and the board of years 2018/2019 and 2019/2020 have put way to much time into solving these problems :P.

## How to generate and deploy the website

To generate and deploy the website you need to be runing Linux or some other UNIX system with bash, hugo and git installed.

**Note about versions (important)**: Hugo is very much NOT backwards compatible, meaning the website does **not** build if you use the latest version of Hugo. We target version 0.123.0, which you can either (recommended) download from [the github releases page](https://github.com/gohugoio/hugo/releases/tag/v0.123.0), or (not recommended) if you use the Nix package manager, you can run `nix develop -f shell.nix`.

Both hugo and git is available for Windows, so it is also possible to devlope on a windows machine.

To build and create a local server which you can examin the site with before deploying it. In the root of the repository run:

```bash
$ hugo server
```

This will create a local server which by default is available at port 1313. Check that everyting is as it should be.

To deploy and publish the site run:

```bash
$ ./publish.sh
```

This will execute a bash script that first will remove any old local build of the website and then regenerate the site. Depending on how close it is to the auction this may take some time if the auction catalogue contains a lot of images. Then the "deploy" branch will be regenerated as an orpahn without history and the generated website will be added to the branch. Lastly the deploy branch will be forced updated at the origin.

There is a webhook that is integrated with the student unions server that will be trigged whenever a new commit is made. This will make the server copy the new website.

## How to configure and make changes to the website
To change the content on the website edit the markdown files located in the content folder. Some configuration can also be made by editing the configuration files in the data directory for example the sponsors and board information.

Some texts on the website have been "hard coded" in the html files in the theme and layout files.

To make larger changes to the website you have to edit the themes and layouts files. Read the documentation for Hugo to get more information on how to do this.


## How to manage the auction
The auction part of the website is managed by several configuration files. To updated date and location edit the "AuctionConfig.toml" file located in the data folder.

To updated the auction catalogue use the spreadsheet template located in content/auction and from this file save a csv file named "auctionItems.csv" in the same folder. This is the file which is used when the website is generated. All images of the auciton items should be stored in the folder "assets/auction/images/". It is important that this folder never gets pushed to GitHub as this will create a very large repository.

Everytime the website is generated Hugo additionaly creates a json file from the csv catalogue. The json file gets published at https://eta.chalmers.se/auction/presentation/index.json. This file is used for the auction presentation page at [eta.chalmers.se/auction/presentation](https://eta.chalmers.se/auction/presentation).
