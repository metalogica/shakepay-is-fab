# Shakepay Net Worth Calculator
* Visit the prototype at [this link](https://shakepay-is-fab.netlify.app)

## Assignment 
* I continued to code on the app past the assignment deadline of June 13th 1400 PST; I guess you could say I was having too much fun 😅.
* However, for the interests of an objective evaluation of my ability, the state of the codebase at the assignment deadline can be found on the branch `assignment` in this repo.
* Bear in mind that for the app to function correctly on the `assignment` branch, it will be necessary to install [Chrome extension](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) to overcome the CORS issues with API calls while using the app. This is because I did not manage to build the custom node Express proxy by the 3-hour deadline, although it is featured in the later commits on the `master` branch.
* Thanks for letting me demonstrate my skills! 💪

## Running Code Locally In Development
* Firstly, clone this github repo to your hard-drive.
* After, in your command line, move into the cloned repo directory
* Ensure you install all the necessary packages by running `yarn install`.
* To see the assignment state, check out to the relevant branch with `git checkout assignment`.
* To run the app in your local browser, use the command `yarn frontend:start`. 
* We're using `react-app-rewired` for faster [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)🚀🚀🚀🚀🚀
* To lint the code, run `yarn lint`. Keep it nice and tidy. 
* To execute the test suite, run `yarn frontend:test`. 🤖
