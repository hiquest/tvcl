# tvcl
A simple show tracker CLI

![](/img/tvcli.png?raw=true)

# Intro
This small tool is a CLI for [http://thetvdb.com/](http://thetvdb.com/) API. It allows to track tv shows you follow and the episodes you didn't watch yet.

# Features
- Lookup for shows
- Viewing episodes titles, air dates, overview, and more
- Marking episodes as wacthed
- Showing episodes you didn't watch yet

# Install

```bash
$ npm install tvcl -g
```

`tvcl` uses the [http://thetvdb.com/](http://thetvdb.com/) API. In order to use it you should [get an API key](http://thetvdb.com/?tab=apiregister) and put it into `THETVDB_API_KEY` environment variable.

# Usage

Lookup the series title:
```bash
$ tv lookup the simpsons
```
(you can use `search` alias)

Add the series to local database by id:
```bash
$ tv add {id}
```

List added series:
```bash
$ tv list
```

View the list of episodes for specified series (--wo stands for "with overview"):
```bash
$ tv view {series_id} --wo
```
(you can use `show` alias)

Mark episode as watched:
```
$ tv watch {epid}
```

Mark all episodes till the specified as watched:
```bash
$ tv watch-till {epid}
```
(you can use `wt` alias)

Show the not-watched-yet episoded:
```
$ tv remained
```
or just
```
$ tv
```
