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
  
  var sheetName = 'Sheet1'
  // the name of the sheet that holds the data.
  
  var numRows = 123;
  // how many rows contain data?
  
  var repeat = false;
  // do you want the script to auto-repeat unless you press cancel?
  
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
  
  // THESE WILL NEED TO BE CHANGED DEPENDING ON YOUR SHEET SETUP.
  // THEY SHOULD BE THE COLUMN THAT HOLDS SERIAL NUMBERS/EMAILS, BUT AS A NUMBER STARTING WITH A=0. EXAMPLE: A=0, C=2, Z=25
  var serial = row[0][8];
  var homeroom = row[0][6];
  //END
  
    Logger.log('Serial: ' + serial);
  Logger.log('Row: ' + row); 
  var info = ui.prompt('Verify:', 'Is ' + serial + ' the serial number? Enter \'y,\' if so or \'n\' if not. Is the charger present? Enter \'y,\' if so or \'n\' if not. Now, if there are any problems with the device, enter them and press OK. (their homeroom is ' + homeroom + ')', ui.ButtonSet.OK).getResponseText(); //prompt
  if (info.getSelectedButton() == ui.Button.CANCEL || info.getSelectedButton == ui.Button.CLOSE) return; // stop if cancelled
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
      var notes = 'Serial does not match; ' + info[3];
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
  
  //charger, notes[serial matches/serial doesn't match; notes they typed in]
  
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Printed List').getRange('C' + i + ':E' + i).setValues([['Yes', charger, notes]]); //final print
  
  if (repeat == true) checkIn();
}

