import { html } from 'lit-html';
import { render } from '../../components/common/render';
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
  const title = 'Material Density';
  const subtitle = html`
  <div>
    Material Design uses low-density space by default (with large tap targets and margins)
    but offers high-density space when it improves the user experience.<br>
    (See <a href="https://material.io/design/layout/applying-density.html">Design guidelines</a>
    & <a href="https://github.com/material-components/material-components-web/tree/master/packages/mdc-density">sample usage</a> on GitHub)
  </div>`;

  return html`
  <div class="mdc-theme-control">
    ${logo({ title: 'Material Density', subtitle })}
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
