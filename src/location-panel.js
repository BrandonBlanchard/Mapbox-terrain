import { locationPresets } from './locations';

const panelStyles = `
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px;
  border: 2px solid #343434;
  background-color: #000;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;

  color: #fff;
  font-family: tahoma;
  font-size: 12px;
  `;

const labelInputStyles = `
  flex-direction: column;
  width: 100px;
  margin: 5px 17px;
`;

const buildLabelInput = (labelText, val) => {
  const container = document.createElement('div');
  container.style = labelInputStyles;

  const label = document.createElement('h4');
  label.innerText = labelText;
  label.style = 'margin: 5px;';

  const input = document.createElement('input');
  input.type = 'number';
  input.style = 'max-width: 100%';
  input.value = val;
  input.step = 0.00001;

  container.appendChild(label);
  container.appendChild(input);

  return [container, input];
};

const buildSubmitButton = () => {
  const button = document.createElement('button');
  button.type = 'button';

  button.style =
    'margin-right: 10px; height: 22px; margin-top: 23px; margin-left: 17px; margin-bottom: 17px';
  button.innerText = 'go!';

  return button;
};

export const buildLocationPanel = (onLocationChange) => {
  const container = document.createElement('div');
  container.style = panelStyles;

  const [latControl, latInput] = buildLabelInput(
    'Lat',
    locationPresets.rainier[1]
  );
  const [lonControl, lonInput] = buildLabelInput(
    'Lon',
    locationPresets.rainier[2]
  );
  const [zoomControl, zoomInput] = buildLabelInput(
    'Zoom',
    locationPresets.rainier[0]
  );
  zoomInput.min = 0;
  zoomInput.max = 15;
  zoomInput.step = 1;
  const submit = buildSubmitButton();

  container.appendChild(latControl);
  container.appendChild(lonControl);
  container.appendChild(zoomControl);
  container.appendChild(submit);

  submit.addEventListener('click', () => {
    onLocationChange(
      parseFloat(zoomInput.value),
      parseFloat(latInput.value),
      parseFloat(lonInput.value)
    );
  });

  document.body.appendChild(container);
};
