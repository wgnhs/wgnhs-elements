import { unsafeCSS } from 'lit-element';
import opensansImport from 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap';
import materialIconsImport from 'https://fonts.googleapis.com/icon?family=Material+Icons';
import structureImport from '../../../css/typography.css';

export const opensans = unsafeCSS(opensansImport);
export const materialIcons = unsafeCSS(materialIconsImport);
export const structure = unsafeCSS(structureImport.replace(/@import.+;/g, ''));

export const typography = [
    opensans,
    materialIcons,
    structure
];