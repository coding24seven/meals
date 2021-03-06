import state from '../state';
import text from './languages';
import getCurrentLanguage from './get-language';
import { headerEl } from '../elements';
import { footerEl } from '../elements';
import { mealsEl } from '../elements';
import { newMealElement } from '../elements';

/// CHANGE THE TEXT LANGUAGE
export default function updateLanguage() {

  const language = getCurrentLanguage();
  localStorage.language = language;

  //. TITLE
  document.title = text.title[language];

  //. MESSAGE FOR THE MEAL-COOKED-CONFIRM ALERT POPUP
  state.mealTodayConfirmMessage = text.mealTodayConfirmMessage[language];

  //. 'CHANGE', 'TO' IN THE 'CHANGE MEAL PROPERTY FROM X TO Y ?' CONFIRM POPUP
  state.mealPropertyChangeQuestionParts = text.mealPropertyChangeQuestionParts[language];

  //. THE BRAND NAME IN THE HEADER
  // check if the element(s) exists on the currently loaded page before you place any text in it
  if (headerEl.brand) {
    // this element's text will require extra modification if modifier property present, or it will not
    const modifier = headerEl.brand.modifier;

    headerEl.brand.innerHTML = modifier ?
      text.headerBrand[modifier.type][language]
      : text.headerBrand[language]
  }

  //. SEARCH INPUT IN THE HEADER
  if (headerEl.searchInput) {
    headerEl.searchInput.placeholder = text.headerInputPlaceholder[language];
  }

  //. 'ADD A MEAL' IN THE HEADER
  if (headerEl.addMeal) {
    headerEl.addMeal.innerHTML = text.headerAddMeal[language];
  }

  //. COPYRIGHT IN THE FOOTER
  if (footerEl.copyright) {
    footerEl.copyright.innerHTML = text.footerCopyright[language];
  }

  //. ALL COOKED TODAY BUTTONS
  if (mealsEl.allTodayButtons) {
    mealsEl.allTodayButtons.forEach(button => {
      button.innerHTML = text.allTodayButtons[language];
    })
  }

  //. 'LAST COOKED ON' PHRASE
  if (mealsEl.allDateKeys) {
    mealsEl.allDateKeys.forEach(phrase => {
      phrase.innerHTML = text.lastCookedOnPhrase[language];
    })
  }

  //. 'COOKED COUNT' PHRASE
  if (mealsEl.allCountKeys) {
    mealsEl.allCountKeys.forEach(phrase => {
      phrase.innerHTML = text.cookedCountPhrase[language];
    })
  }

  //. <h2> NEW MEAL ADDED MESSAGE, INITIALLY HIDDEN
  if (newMealElement.newMealAddedMessage) {

    const { modifier } = newMealElement.newMealAddedMessage;

    newMealElement.newMealAddedMessage.innerHTML = modifier ?
      text.newMealAddedMessage[modifier.type][language]
      + modifier.mealName
      :
      text.newMealAddedMessage[language]
  }

  //. NEW MEAL HEADING
  if (newMealElement.newMealHeading) {

    const { modifier } = newMealElement.newMealHeading;

    newMealElement.newMealHeading.innerHTML = modifier ?
      text.newMealHeading[modifier.type][language]
      :
      text.newMealHeading[language];
  }

  //. MEAL NAME TEXT INPUT PLACEHOLDER
  if (newMealElement.mealNameInput) {
    newMealElement.mealNameInput.placeholder = text.mealNameInputPlaceholder[language]
  }

  //. MEAL SUBMISSION PASSWORD INPUT (PLACEHOLDER)
  if (newMealElement.passwordInput) {

    const modifier = newMealElement.passwordInput.modifier

    newMealElement.passwordInput.placeholder = modifier ?
      text.passwordInputPlaceholder[modifier.type][language]
      :
      text.passwordInputPlaceholder[language]
  }

  //. <span> 'SELECT IMAGE' TEXT INSIDE THE NEW-MEAL BUTTON-LIKE LABEL
  if (newMealElement.pickImageText) {

    const modifier = newMealElement.pickImageText.modifier

    newMealElement.pickImageText.innerHTML = modifier ?
      text.pickImageText[modifier.type][language][0]
      + modifier.midMessage // optional message from modifier to insert in the middle
      + text.pickImageText[modifier.type][language][1]
      :
      text.pickImageText[language];
  }
  //. <button> SUBMIT MEAL BUTTON
  if (newMealElement.submitMealButton) {
    newMealElement.submitMealButton.innerHTML = text.submitMealButton[language];
  }

  //. <a> GO TO MAIN PAGE LINK
  if (newMealElement.goToMainPage) {
    newMealElement.goToMainPage.innerHTML = text.goToMainPage[language];
  }

  ///
  return language;
}
