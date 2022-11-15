# Zoom logs analyzer

## About

This application takes [Zoom](https://zoom.us/) chat logs recorded after the call and returns the list of all participants and their chat messages. This is useful to analyze conference participants’ activity and attendance.

## Live version

Available at GitHub pages: <https://mr9d.github.io/zoom-logs-analyzer/> (deployed from the `master` branch)

## Running locally

If you want to run the application locally, you can do the following:

- `git clone` the repository
- Open `index.html` in the browser.

That’s it, no build required.

## How to use

During the Zoom conference start the recording on your computer and ask people to use the chat. After the end of the conference, you will find the chat log near the recording in the `chat.txt` file. 

The format of this file is the following:

```
10:23:57	 From  Alexandr Kozlov : Hello world
10:23:59	 From  Alexandr Kozlov : Nice to see you
10:24:00	 From  Alexandr Kozlov : 123
```

Just open the logs analyzer and drop the `chat.txt` file into it.

You will see the list of participants and how active they were. Click on one participant to expand the list of their messages.

## Used technologies

- HTML5
- CSS3
- JavaScript ES6
- GitHub Pages ([documentation](https://docs.github.com/en/pages))
