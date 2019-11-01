import { html, render } from 'lit-html';
import { MDCTextField } from '@material/textfield';
import { toggleButton, toggleButtonOption } from '../common/toggle-button';
import { button } from '../../components/button';
import { iconButton } from '../../components/icon-button';
import { chip } from '../../components/chip';
import { checkbox } from '../../components/checkbox';
import { textField } from '../../components/text-field';
import { logo } from '../common/logo';
import {Store} from './store';
import './density.scss';

interface AppStore {
  densityScale: string,
  shape: string,
}

const store = new Store({
  densityScale: 'default',
  shape: 'default',
});

export const app = (store: Partial<AppStore> = {}) => {
  return html`
  <div class="mdc-theme-control">
    ${logo({ title: 'Density Demo' })}
    <div class="control-row">
      ${densityScaleControls(store.densityScale)}
      ${shapeControls(store.shape)}
    </div>
  </div>
  <div class="mdc-divider"></div>
  <div class="component-columns">
    <section class="components">
      ${buttonSection(store)}
      ${chipSection(store)}
      ${iconButtonSection(store)}
      ${checkboxSection(store)}
    </section>
    <section class="components">
      ${textFieldSection(store)}
    </section>
  </div>
  `;
};

const buttonSection = (store: Partial<AppStore> = {}) => {
  const { densityScale, shape } = store;

  const classes = {
    'dense-default': densityScale === 'default',
    'dense-comfortable': densityScale === 'comfortable',
    'dense-compact': densityScale === 'compact',
    'is-rounded': shape === 'rounded',
  };

  return html`
    <section class="component">
      <div class="section-title">Button</div>
      <div class="row row-flex">
        ${button({ label: 'Button', iconName: 'add', unelevated: true, classes })}
        ${button({ label: 'Button', iconName: 'add', classes })}
        ${button({ label: 'Button', iconName: 'add', outlined: true, classes })}
      </div>
    </section>
  `;
};

const iconButtonSection = (store: Partial<AppStore> = {}) => {
  const { densityScale } = store;

  const classes = {
    'dense-default': densityScale === 'default',
    'dense-comfortable': densityScale === 'comfortable',
    'dense-compact': densityScale === 'compact',
  };

  return html`
    <section class="component">
      <div class="section-title">Icon Button</div>
      <div class="row">
        ${iconButton({iconName: 'format_underline', ariaLabel: 'Format underline', classes})}
        ${iconButton({iconName: 'attach_file', ariaLabel: 'Attach file', classes})}
        ${iconButton({iconName: 'link', ariaLabel: 'Add link', classes})}
        ${iconButton({iconName: 'tag_faces', ariaLabel: 'Add smiley', classes})}
      </div>
    </section>`;
};

const chipSection = (store: Partial<AppStore> = {}) => {
  const { densityScale } = store;

  const classes = {
    'dense-default': densityScale === 'default',
    'dense-comfortable': densityScale === 'comfortable',
    'dense-compact': densityScale === 'compact',
  };

  return html`
    <section class="component">
      <div class="section-title">Chips</div>
      <div class="row">
        <div class="mdc-chip-set" role="grid">
          ${chip({label: 'Turn on lights', iconName: 'wb_sunny', classes})}
          ${chip({label: 'Set alarm', iconName: 'alarm', classes})}
          ${chip({label: 'Play music', iconName: 'music_note', classes})}
        </div>
      </div>
    </section>`;
};

const textFieldSection = (store: Partial<AppStore> = {}) => {
  const { densityScale, shape } = store;

  const classes = {
    'dense-default': densityScale === 'default',
    'dense-comfortable': densityScale === 'comfortable',
    'dense-compact': densityScale === 'compact',
    'is-rounded': shape === 'rounded',
  };

  return html`
    <section class="component">
      <div class="section-title">Text Field</div>
      <div class="row">
        ${textField({label: 'Label', helperText: 'Assistive text', value: 'Pre-filled', outlined: true, leadingIconName: 'search', classes})}
        ${textField({label: 'Label', helperText: 'Assistive text', value: 'Pre-filled', characterLimit: 18, leadingIconName: 'search',  trailingIconName: 'visibility', outlined: true, classes})}
        ${textField({label: 'Label', helperText: 'Assistive text', outlined: true, leadingIconName: 'search', classes})}
        ${textField({label: 'Label', helperText: 'Assistive text', value: 'Pre-filled', characterLimit: 18, leadingIconName: 'favorite', classes})}
        ${textField({label: 'Label', helperText: 'Assistive text', leadingIconName: 'search', characterLimit: 18, classes})}
      </div>
    </section>`;
};

const checkboxSection = (store: Partial<AppStore> = {}) => {
  const { densityScale } = store;

  const classes = {
    'dense-default': densityScale === 'default',
    'dense-comfortable': densityScale === 'comfortable',
    'dense-compact': densityScale === 'compact',
  };

  return html`
    <section class="component">
      <div class="section-title">Checkbox</div>
      <div class="row">
        ${checkbox({label: 'Pickles', classes})}
        ${checkbox({label: 'Tomato', checked: true, classes})}
        ${checkbox({label: 'Lettuce', checked: true, classes})}
      </div>
    </section>`;
};

const densityScaleControls = (densityScale) => {
  if (densityScale == undefined) {
    densityScale = 'default';
  }

  const toggleButtonOptions = html`
    ${toggleButtonOption(({ label: 'Default', value: 'default', selected: (densityScale == 'default') }))}
    ${toggleButtonOption(({ label: 'Comfortable', value: 'comfortable', selected: (densityScale == 'comfortable') }))}
    ${toggleButtonOption(({ label: 'Compact', value: 'compact', selected: (densityScale == 'compact') }))}
  `;

  return html`
  <div class="control">
    <span class="control-label">Density scale</span>
    ${toggleButton({
    children: toggleButtonOptions,
    onChange: handleDensityScaleChange,
  })}
  </div>`;
};

const handleDensityScaleChange = (event) => {
  const densityScale = event.target.getAttribute('data-value');
  store.set({densityScale});
  rerender(store.get());
};

const shapeControls = (shape) => {
  if (shape == undefined) {
    shape = 'default';
  }

  const toggleButtonOptions = html`
    ${toggleButtonOption(({ label: 'Default', value: 'default', selected: (shape == 'default') }))}
    ${toggleButtonOption(({ label: 'Rounded', value: 'rounded', selected: (shape == 'rounded') }))}
  `;

  return html`
  <div class="control">
    <span class="control-label">Shape</span>
    ${toggleButton({
    children: toggleButtonOptions,
    onChange: handleShapeChange,
  })}
  </div>`;
};

const handleShapeChange = (event) => {
  const shape = event.target.getAttribute('data-value');
  store.set({shape});
  rerender(store.get());
};

const rerender = (store: Partial<AppStore> = {}) => {
  return render(app(store), document.querySelector('.app'));
}

rerender(store.get());

// 'is-rounded': this.rounded === true,
// 'dense--3': this.density === '-3',
// 'dense--2': this.density === '-2',
// 'dense--1': this.density === '-1',
// 'dense--0': this.density === '-0',
// 'dense-default': this.density === 'default',
// 'dense-comfortable': this.density === 'comfortable',
// 'dense-compact': this.density === 'compact',

// export const densityApp = () => {
//   return html`${themeControl()}

// <div class="component-columns">
//   <section class="components">
//     <!-- Button -->
//     <section class="component">
//       <section-title>Button</section-title>
//       <div class="row row-flex">
//         <mdc-button raised>Button</mdc-button>
//         <mdc-button>Button</mdc-button>
//         <mdc-button outlined>Button</mdc-button>
//       </div>
//       <div class="row row-flex">
//         <mdc-button icon="add" raised>Button</mdc-button>
//         <mdc-button icon="add">Button</mdc-button>
//         <mdc-button icon="add" outlined>Button</mdc-button>
//       </div>
//     </section>

//     <!-- Icon Button -->
//     <section class="component">
//       <section-title>Icon Button</section-title>
//       <div class="row">
//         <mdc-icon-button icon="favorite"></mdc-icon-button>
//         <mdc-icon-button icon="add"></mdc-icon-button>
//         <mdc-icon-button icon="mic_none"></mdc-icon-button>
//       </div>
//     </section>

//     <!-- Chips -->
//     <section class="component">
//       <section-title>Chips</section-title>
//       <div class="row align-center">
//         <mdc-chip>Body 2</mdc-chip>
//         <mdc-chip icon="check">Body 2</mdc-chip>
//         <mdc-chip icon="check">Body 2</mdc-chip>
//       </div>
//     </section>

//     <!-- Checkbox -->
//     <section class="component">
//       <section-title>Checkbox</section-title>
//       <div class="row">
//         <mdc-checkbox></mdc-checkbox>
//         <mdc-checkbox checked></mdc-checkbox>
//         <mdc-checkbox indeterminate></mdc-checkbox>
//       </div>
//     </section>
//   </section>

//   <section class="components">
//     <!-- Text Field -->
//     <section class="component">
//       <section-title>Text Field</section-title>
//       <div class="row">
//         <mdc-text-field label="Label" helperText="Assistive text" trailingIcon="remove_red_eye" outlined></mdc-text-field>
//         <mdc-text-field label="Label" helperText="Assistive text" outlined></mdc-text-field>
//         <mdc-text-field label="Standard" value="Pre-filled" helperText="Assistive text" outlined></mdc-text-field>
//         <mdc-text-field label="Label" helperText="Assistive text"></mdc-text-field>
//         <mdc-text-field label="Label" value="Pre-filled" helperText="Assistive text"></mdc-text-field>
//       </div>
//     </section>
//   </section>
// </div>`;
// };

// document.addEventListener('DOMContentLoaded', () => {
//   document.body.addEventListener('changed', (event) => {
//     const controlClassName = (event.composedPath()[0] as HTMLElement).classList.value;

//     const COMPONENT_SELECTOR = 'mdc-button, mdc-icon-button, mdc-chip, mdc-text-field, mdc-checkbox';
//     const DENSITY_SCALE_CONTROL_CLASS = 'density-scale-toggle-button';
//     const SHAPE_CONTROL_CLASS = 'rounded-shape-toggle-button';
//     if (controlClassName === DENSITY_SCALE_CONTROL_CLASS) {
//       const density = event.detail.selected;
//       for (const component of document.querySelectorAll(COMPONENT_SELECTOR)) {
//         component.density = density;
//         component.layout && component.layout();
//       }
//     } else if (controlClassName === SHAPE_CONTROL_CLASS) {
//       const isRounded = event.detail.selected === 'rounded';

//       for (const component of document.querySelectorAll(COMPONENT_SELECTOR)) {
//         component.rounded = isRounded;
//       }
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');
  for (const el of document.querySelectorAll('.mdc-text-field')) {
    MDCTextField.attachTo(el);
  }
});
