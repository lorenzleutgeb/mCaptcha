/*
 * Copyright (C) 2021  Aravinth Manivannan <realaravinth@batsense.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import VALIDATE_LEVELS from './levels';
import isBlankString from '../../utils/isBlankString';
import isNumber from '../../utils/isNumber';

const LABEL_CONTAINER_CLASS = 'sitekey-form__add-level-flex-container';
const LABEL_CLASS = 'sitekey-form__label';
export const LABEL_INNER_TEXT_WITHOUT_LEVEL = 'Level ';

export const INPUT_ID_WITHOUT_LEVEL = 'level';
const INPUT_CLASS = 'sitekey-form__input--add-level';

const ADD_LEVEL_BUTTON_INNER_TEXT = 'Add Level';
const ADD_LEVEL_BUTTON = 'sitekey-form__add-level-button';

export const getNumLevels = () => {
  let numLevels = 0;
  document.querySelectorAll(`.${LABEL_CLASS}`).forEach(_ => numLevels++);
  return numLevels;
};

const validateLevel = (numLevels: number) => {
  numLevels = numLevels - 1;
  let inputID = INPUT_ID_WITHOUT_LEVEL + numLevels.toString();
  let filed = LABEL_INNER_TEXT_WITHOUT_LEVEL + numLevels;
  let inputElement = <HTMLInputElement>document.getElementById(inputID);

  let val = inputElement.value;
  if (!isNumber(val)) {
    return false;
  }

  let level = parseInt(val);
  if (Number.isNaN(level)) {
    alert('Level can contain nubers only');
    return false;
  }

  let e = null;
  console.log(level);

  isBlankString(e, val, filed);
  let isValid = VALIDATE_LEVELS.add(level);
  return isValid;
};

const addLevelButtonEventHandler = (e: Event) => {
  let eventTarget = <HTMLElement>e.target;
  //  if (!eventTarget) {
  //    return;
  //  }
  const PREV_LEVEL_CONTAINER = <HTMLElement>eventTarget.parentElement;
  let numLevels: string | number = getNumLevels();
  let isValid = validateLevel(numLevels);
  console.log(`[addLevelButton] isValid: ${isValid}`);

  if (!isValid) {
    return console.log('Aborting level addition');
  }

  eventTarget.remove();

  numLevels = numLevels.toString();

  let labelContainer = document.createElement('div');
  labelContainer.className = LABEL_CONTAINER_CLASS;

  let inputID = INPUT_ID_WITHOUT_LEVEL + numLevels;
  let label = document.createElement('label');
  label.className = LABEL_CLASS;
  label.htmlFor = inputID;
  label.innerText = LABEL_INNER_TEXT_WITHOUT_LEVEL + numLevels;

  labelContainer.appendChild(label);

  PREV_LEVEL_CONTAINER.insertAdjacentElement('afterend', labelContainer);

  let inputContainer = document.createElement('div');
  inputContainer.className = LABEL_CONTAINER_CLASS;

  let input = document.createElement('input');
  input.id = inputID;
  input.name = inputID;
  input.type = 'text';
  input.className = INPUT_CLASS;

  inputContainer.appendChild(input);

  let button = document.createElement('button');
  button.className = ADD_LEVEL_BUTTON;
  button.innerText = ADD_LEVEL_BUTTON_INNER_TEXT;

  inputContainer.appendChild(button);

  labelContainer.insertAdjacentElement('afterend', inputContainer);

  addLevelButtonAddEventListener();
};

export const addLevelButtonAddEventListener = () => {
  let addLevelButton = <HTMLElement>(
    document.querySelector(`.${ADD_LEVEL_BUTTON}`)
  );
  addLevelButton.addEventListener('click', addLevelButtonEventHandler);
};

/*
 <div class="sitekey-form__add-level-flex-container">
<label class="sitekey-form__label" for="level2">Level 2</label>
</div>

<div class="sitekey-form__add-level-flex-container">
<input
  class="sitekey-form__input--add-level"
  type="text"
  name="level2"
  id="level2"
  value=""
/>
<button class="sitekey-form__add-level-button">Add Level</button>
</div>
*/