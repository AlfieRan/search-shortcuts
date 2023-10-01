# Search Shortcuts
Search the web faster with in-browser shortcuts

## Installation
To install this extension, all you have to do is set your default browser engine to the following url:
```url
https://search-shortcuts.alfie-ranstead.workers.dev/search?q={%s}
```
Where `{%s}` is the search query and should be replaced with whatever your browser uses to represent the search query.
In Firefox, this is `%s`, so the url would be:
```url
https://search-shortcuts.alfie-ranstead.workers.dev/search?q=%s
```

## Usage
There are two types of shortcuts, standard and account based.

#### 1. Standard Shortcuts
Standard shortcuts can be used by typing `!` followed by the shortcut name, then if you want to search for something,
type a space and then your search query.

For example to go to the youtube home page you could type `!yt` or `!youtube`, and to search for a video you could type `!yt cats`.

#### 2. Account shortcuts

Account are shortcuts that try and take you to an account on the website referenced by the shortcut, they also allow you
to navigate to a specific page on the website. To use an account shortcut type `@` followed by the shortcut name,
then if you want to search for something, type a space and then your search query.

For example if you wanted to go to my github profile you could type `@gh alfieran`, and if you wanted to go to this repository you could
type `@gh alfieran/search-shortcuts`.

Not all websites that have standard shortcuts have account shortcuts, but if you want to add one, you can do so by creating a pull request.

## Contributing
To contribute to this project you will need to first complete the setup steps below:
1. Clone this repository.
2. Run `yarn install` or `npm install` to install all dependencies.

Now you can start developing as according to the specific section you are contributing to.

### Adding a new shortcut
1. Head to the `/src/shortcuts.ts` file, the file also contains instructions on how to add a shortcut within this file
but I will also explain it here.
2. Add your shortcut(s) aliases to the relevant array(s) starting on line 10, these arrays are split up by genre so
please add your shortcut to the correct array.
3. Now add your actual shortcut urls to the `shortcuts` object below the arrays, they key should be your shortcut
name/aliases and the value should follow the type `ShortcutData` which is defined at the top of the file.
(This const should be typed, so if you are using an IDE it should tell you what type the value should be).
4. Once you have added your shortcut, please test it locally using `yarn dev` or `npm run dev` and make sure it works as expected,
you should be able to test the search by going to `localhost:8787/search?q=your+search+query`.
5. Once you are happy with your shortcut, please create a pull request that begins with the tag `add-shortcut-` and
some relevant additional detail and I will review it as soon as possible.

### Adding a new engine
To add a new engine, please follow the steps below:
1. Head to the `/src/engines.ts` file, the file also contains instructions on how to add an engine within this file but
I will also explain it here.
2. Add the engine name/alias to the `availableEngines` array on line 10.
3. Now add your actual engine urls to the `engines` object below the array, the key should be your engine name/alias and
the value should follow the type `EngineData` defined at the top of the file.
4. Once you have added your engine, please test it locally using `yarn dev` or `npm run dev` and make sure it works as expected,
you should be able to test the search by going to `localhost:8787/search?q=test&e=your+engine+name`.
5. Once you are happy with your engine, please create a pull request that begins with the tag `add-engine-` and
some relevant additional detail and I will review it as soon as possible.

### Bug fixes / other changes
If you are fixing a bug or making another change, please create a pull request that begins with the tag `fix-` or `change-`
and ensure you test your changes locally using `yarn dev` or `npm run dev` and make sure it works as expected.

## License
This project is licensed under the MIT license, see the [LICENSE](LICENSE) file for more details.

## Credits
This project was created by [Alfie Ranstead](https://alfieranstead.com).

Inspired by [Alistair Smith's Searchy](https://github.com/alii/searchy) which I used to use but grew frustrated with the fact
it doesn't work with multiple shortcut types under the same alias (non-query shortcuts, query shortcuts and account shortcuts).
