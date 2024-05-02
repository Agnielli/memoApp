import { SvgCss } from 'react-native-svg/css';

const xml = `<svg width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">

<defs>

<style>.cls-1{fill:none;stroke:#F5F5F5;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style>

</defs>

<title/>

<g id="checkmark">

<line class="cls-1" x1="3" x2="12" y1="16" y2="25"/>

<line class="cls-1" x1="12" x2="29" y1="25" y2="7"/>

</g>

</svg>`

export const Accept = () => <SvgCss xml={xml} width="50%" height="50%" />