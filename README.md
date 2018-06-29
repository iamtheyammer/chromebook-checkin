# chromebook-checkin
Help check-in chromebooks and chargers along with adding a note.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
  - [Normal mode](#normal-mode)
  - [Simple mode](#simple-mode)
- [Support/help](#supporthelp)
- [License](#license)
- [Committing/Pull Requests](#committingpull-requests)
- [Credits](#credits)

## Install
1. Open a Google Spreadsheet, go to Tools -> Script Editor, and paste in [Code.min.gs](https://raw.githubusercontent.com/iamtheyammer/chromebook-checkin/master/Code.min.gs) (Code.gs will work too, but the minfied version can be faster and is definitely smaller).  
2. Then, on the toolbar, under 'Select a function', select 'onOpen'. It will tell you to save the script, then name it.  
3. Go back to the script editor and press the play button. This time it will ask you for permissions. Approve them.
4. Set the settings at the top of the checkIn function.
5. Save the document.
6. Close the script editor.
7. Reload your spreadsheet.
8. On the menubar of your sheet, you'll see 'Chromebook Check-In'. Click on then press start. 

## Usage

### Normal mode
Normal mode sacrifices some simplicity for efficiency, where it asks you for the serial match, charger status and notes in one box. This is much faster en masse, and is reccomended for most users.

1. Go to the menubar, click on 'Chromebook Check-In', then press Start.
2. It will ask you for the beginning (the pre-@ part) of the email. Enter that.
3. It will pull out the serial number for that email, ask you if a charger is included, plus ask for notes.
 #### Example Responses:
 - **n,y,Broken hinge** // the serial number doesn't match the stated one, a charger is present and, as your note, you stated 'Broken hinge'
 - **y,n,Cracked screen** // the serial number matches the stated one, a charger is present, and your note states 'Cracked screen'
 - **y,y** // serial number matches and a charger is present. No note.
 - **n,n** // serial number doesn't match and np charger is present. No note.
4. Done! If the repeat option is set to true in Code.gs, you'll be back at step 2 so you can work on the next chromebook. (break out of this by pressing cancel on any prompt).

#### Power-user shortcuts for #3
- *enter nothing* // Serial number matches and charger is present. No note.
- **n** // Serial doesn't match, charger is present, no note.
- **,n,Dead battery** // Serial matches, no charger, Note: 'Dead battery'.
- **,,Doesn't boot** // Serial matches, charger is present, Note: 'Doesn't boot'.

Basically, an empty field (the software delineates fields with a ',') defaults to a yes.

### Simple mode
Simple mode compromises some efficiency for simplicity when checking devices in. This is great for volunteers who might not be as tech-savvy. Most users, however, should use normal mode for efficiency.

1. Go to the menubar, click on 'Chromebook Check-In', then press Start.
2. It will ask you for the beginning (the pre-@ part) of the email. Enter that.
3. It will ask you if the charger is present with yes/no buttons.
4. If you've got some notes, enter them and press yes, otherwise press no.
5. It will ask if the serial number matches the one in the dialog box with yes/no buttons.
6. Done! If the repeat option is set to true in Code.gs, you'll be back at step 2 so you can work on the next chromebook. (break out of this by pressing cancel on the email prompt).
## Support/Help
No promises there but I might be able to help a tad. Make an issue to ask for help.

## License
This software is licensed with a GNU GPL v3.0 license.

## Committing/Pull Requests
Please feel free to clean up my code or add to it-- shoot over a PR!

## Credits
I made this myself.
