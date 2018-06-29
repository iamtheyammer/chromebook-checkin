/*
 * CHROMEBOOK CHECK-IN SCRIPT
 * https://github.com/iamtheyammer/chromebook-checkin
 * 
 * THIS SCRIPT IS LICENSED UNDER THE GPL LICENSE, WITH NO WARRANTY OR SUPPORT INCLUDED.
 * OPEN AN ISSUE IF YOU HAVE A QUESTION, BUT THERE'S NO GUARANTEE IT'LL BE ANSWERED.
 * 
 * Read the README.MD file in this repository for more information. 
 */


function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('Chromebook Check-In').addItem('Start', 'checkIn').addToUi();
}

function checkIn() {
  
  // SETTINGS
  
  var emailDomain = 'abc.com';
  // the text after the @ in the emails.
  
  var emailColumn = 'A';
  // the column that holds email addresses
  
  var serialColumn = '0'
  // the column # that holds serial numbers, and subtract one, ex. a=0, c=2, z=25
  
  var homeroomColumn = '1'
  // the column # that holds homerooms, and subtract one, ex. a=0, c=2, z=25
  
  var sheetName = sheetName
  // the name of the sheet that holds the data.
  
  var numRows = 123;
  // how many rows contain data?
  
  var repeat = false;
  // do you want the script to auto-repeat unless you press cancel?
  
  var simple = false;
  // makes the script 'hand-hold' users-- takes more time and is less efficient, read the README.
  
  var printColumns = ['C', 'E'];
  // looking for the columns in the order: Chromebook, Charger, Notes, example ['A', 'C']
  
  // END OF SETTINGS
  
  var ui = SpreadsheetApp.getUi();
  
  var name = ui.prompt('Enter the student\'s email.', 'Omit the @' + emailDomain + '.', ui.ButtonSet.OK_CANCEL); //ask for email
  if (name.getSelectedButton() == ui.Button.CANCEL || name.getSelectedButton == ui.Button.CLOSE) return; // stop if cancelled
  name = name.getResponseText().split('@')[0]; // take the domain off
  Logger.log(name); // log the name
  var range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange(emailColumn + '1:' + emailColumn + numRows).getValues(); //get the emails into an array
  //return Logger.log(range);
  
  for (var i = 0; i < range.length; i++) { //loop thru emails to find ours
    //Logger.log(i);
    //var cell = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange('H' + i).getValue();
    var cell = range[i-1]; //define the working cell
    //Logger.log('Cell: ' + cell);
    if (name + '@' + emailDomain == cell) {
      break;
    } else {
      if (i == range.length-1) return ui.alert('I couldn\'t find that email in my list. Try again.');
    }
  }
  
  var row = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange('A' + i + ':N' + i).getValues(); //grab the row with the correct email
 
  var serial = row[0][serialColumn];
  var homeroom = row[0][homeroomColumn];
  
    Logger.log('Serial: ' + serial);
  Logger.log('Row: ' + row); 
  if (simple == false) {
    var info = ui.prompt('Verify:', 'Is ' + serial + ' the serial number? Enter \'y,\' if so or \'n\' if not. Is the charger present? Enter \'y,\' if so or \'n\' if not. Now, if there are any problems with the device, enter them and press OK. (their @dtech is ' + homeroom + ')', ui.ButtonSet.OK); //prompt
    if (info.getSelectedButton() == ui.Button.CANCEL || info.getSelectedButton() == ui.Button.CLOSE) return; // stop if cancelled
    info = info.getResponseText();
    info = info.split(','); //split response by comma
    Logger.log(info);
    if (info[0] == 'n') { //check answers
      var serialMatch = false;
    } else {
      var serialMatch = true;
    }
    if (info[1] == 'n') { //check answers
      var charger = 'No';
    } else {
      var charger = 'Yes';
    }
    if (info[2]) { //check answers
      if (serialMatch == false) {
        var notes = 'Serial does not match; ' + info[2];
      } else {
        var notes = info[2];
      }
    } else {
      if (serialMatch == false) { 
        var notes = 'Serial does not match;'
        } else {
          var notes = ' ';
        }
    }
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange(printColumns[0] + i + ':' + printColumns[1] + i).setValues([['Yes', charger, notes]]); //final print
  } else {
    var serialMatch = function(serial) {
      switch (SpreadsheetApp.getUi().alert('Verify:', 'Is ' + serial + ' the serial number?', SpreadsheetApp.getUi().ButtonSet.YES_NO)) {
        case SpreadsheetApp.getUi().Button.YES:
          return true;
        case SpreadsheetApp.getUi().Button.NO: 
          return false;
                                                                                                                                      }
    }
      var charger = function() {
        switch (SpreadsheetApp.getUi().alert('Verify:', 'Is the charger present?', SpreadsheetApp.getUi().ButtonSet.YES_NO)) {
          case SpreadsheetApp.getUi().Button.YES:
            return 'Yes';
          case SpreadsheetApp.getUi().Button.NO: 
            return 'No';
        }
      }
      var notes = function(serial) {
        var prompt = SpreadsheetApp.getUi().prompt('Verify:', 'Any notes? A note could include the condition of the device, etc.', SpreadsheetApp.getUi().ButtonSet.YES_NO);
        switch (prompt.getSelectedButton()) {
          case SpreadsheetApp.getUi().Button.YES:
            if (serialMatch(serial) == true) {
              return prompt.getResponseText();
            } else {
              return 'Serial does not match; ' + prompt.getResponseText();
            }
            return prompt.getResponseText();
          case SpreadsheetApp.getUi().Button.NO: 
            if (serialMatch(serial) == true) {
              return ''
            } else {
              return 'Serial does not match;'
            }
        }
    }
    //Logger.log(serialMatch(serial));
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange(printColumns[0] + i + ':' + printColumns[1] + i).setValues([['Yes', charger(), notes(serial)]]); //final print
  }
  //charger, notes[serial matches/serial doesn't match; notes they typed in]
  
  
  
  if (repeat == true) checkIn();
}

