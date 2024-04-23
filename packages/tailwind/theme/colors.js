// @ts-check
export const colors = {
    inherit: 'inherit',
    current: 'currentColor',
    transparent: 'transparent',
    black: '#000',
    white: '#fff',

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=6744#Content_ctl00_93872_ctl01_ctl07
    gray: {
        50: '#F3F3F3', // Grijs 1
        100: '#E6E6E6', // Grijs 2
        200: '#CCCCCC', // Grijs 3
        300: '#B4B4B4', // Grijs 4
        400: '#999999', // Grijs 5
        500: '#696969', // Grijs 6
        600: '#535353', // Grijs 7
        700: '#404040', // Grijs 8
        800: '#262626',
        900: '#1D1D1D', // Grijs 9
        950: '#0A0A0A',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=9247
    'logo-blue': {
        50: '#f5f7f9',
        100: '#e8edf1',
        200: '#dce3ea', // 15%
        300: '#b8c6d5', // 30%
        400: '#95a9c0', // 45%
        500: '#738eab', // 60%
        600: '#4f7196', // 75%
        700: '#154273', // 100%
        800: '#173a63',
        900: '#113155',
        950: '#0f2542',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8959
    purple: {
        50: '#f9f8fa',
        100: '#f4f1f6',
        200: '#eae6ee',
        300: '#E3DCE7', // 15%
        400: '#C6B8CE', // 30%
        500: '#A995B7', // 45%
        600: '#8D729F', // 60%
        700: '#714F87', // 75%
        800: '#42145f', // 100%
        900: `#2f0b47`,
        950: '#1e0330',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8965
    violet: {
        50: '#fcf7fa',
        100: '#fbf4f8',
        200: '#f8ebf2',
        300: '#F2D9E7', // 15%
        400: '#E5B2CF', // 30%
        500: '#D88CB7', // 45%
        600: '#CB66A0', // 60%
        700: '#BE4088', // 75%
        800: '#a90061', // 100%
        900: '#950657',
        950: '#5d0031',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8969
    ruby: {
        50: '#fcf3f7',
        100: '#fae9f1',
        200: '#F7D9E7', // 15%
        300: '#EFB2CE', // 30%
        400: '#E78CB6', // 45%
        500: '#DF669D', // 60%
        600: '#D74085', // 75%
        700: '#ca005d', // 100%
        800: '#b00451',
        900: '#920946',
        950: '#5b0026',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8967
    pink: {
        50: '#FDEFF8', // 15%
        100: '#FBDEF0', // 30%
        200: '#F8CEE8', // 45%
        300: '#F6BDE1', // 60%
        400: '#F4ADD9', // 75%
        500: '#f092cd', // 100%
        600: '#e351a8',
        700: '#d13189',
        800: '#b5216e',
        900: '#951f5a',
        950: '#61143b',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8973
    red: {
        50: '#fef3f2',
        100: '#F9DFDD', // 15%
        200: '#F2BFBB', // 30%
        300: '#EC9F99', // 45%
        400: '#E67F78', // 60%
        500: '#DF6056', // 75%
        600: '#d52b1e', // 100%
        700: '#bc2519',
        800: '#9c2118',
        900: '#81221b',
        950: '#460d09',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8977
    orange: {
        50: '#fdfaf2',
        100: '#FBEAD9', // 15%
        200: '#F6D4B2', // 30%
        300: '#F1BE8C', // 45%
        400: '#EDA966', // 60%
        500: '#E89440', // 75%
        600: '#e17000', // 100%
        700: '#b94b04',
        800: '#963a0a',
        900: '#7b300c',
        950: '#471601',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8979
    'dark-yellow': {
        50: '#FEF4DB', // 15%
        100: '#FEE9B7', // 30%
        200: '#FDDE94', // 45%
        300: '#FDD370', // 60%
        400: '#FDC84D', // 75%
        500: '#ffb612', // 100%
        600: '#f99807',
        700: '#dd7102',
        800: '#b74e06',
        900: '#943b0c',
        950: '#642607',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8981
    yellow: {
        50: '#FEFBDD', // 15%
        100: '#FDF6BB', // 30%
        200: '#FCF199', // 45%
        300: '#FBED78', // 60%
        400: '#FAE856', // 75%
        500: '#f9e11e', // 100%
        600: '#e9c609',
        700: '#c99c05',
        800: '#a07008',
        900: '#84580f',
        950: '#512f0b',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8983
    'dark-brown': {
        50: '#fffafa',
        100: '#f9f7f7',
        200: '#f2eeee',
        300: '#E8E0DF', // 15%
        400: '#D1C1BD', // 30%
        500: '#BAA39D', // 45%
        600: '#A3847D', // 60%
        700: '#8D665D', // 75%
        800: '#673327', // 100%
        900: '#51261f',
        950: '#371913',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8985
    brown: {
        50: '#fffefa',
        100: '#f9f7f1',
        200: '#EFEADA', // 15%
        300: '#DFD4B5', // 30%
        400: '#CFBF90', // 45%
        500: '#BFA96C', // 60%
        600: '#AF9447', // 75%
        700: '#94710a', // 100%
        800: '#825f11',
        900: '#6f4d14',
        950: '#412907',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8987
    'dark-green': {
        50: '#f3faf5',
        100: '#f5f8f6',
        200: '#DEE6E1', // 15%
        300: '#BDCDC2', // 30%
        400: '#9DB4A4', // 45%
        500: '#7D9B87', // 60%
        600: '#5D8269', // 75%
        700: '#275937', // 100%
        800: '#20472e',
        900: '#1b3926',
        950: '#0e2016',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8989
    green: {
        50: '#f9fcf7',
        100: '#f1f7ee',
        200: '#E1EDDA', // 15%
        300: '#C3DBB5', // 30%
        400: '#A5C991', // 45%
        500: '#88B76D', // 60%
        600: '#6AA549', // 75%
        700: '#39870c', // 100%
        800: '#2e650f',
        900: '#285512',
        950: '#112f04',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8991
    moss: {
        50: '#fdfdf7',
        100: '#f7f7ef',
        200: '#EBEBD9', // 15%
        300: '#D6D7B2', // 30%
        400: '#C1C38C', // 45%
        500: '#ADAF66', // 60%
        600: '#999C40', // 75%
        700: '#777b00', // 100%
        800: '#5c6106',
        900: '#303700',
        950: '#232900',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8993
    mint: {
        50: '#EAF8F4', // 15%
        100: '#D5F1E9', // 30%
        200: '#C1EBDE', // 45%
        300: '#ACE4D3', // 60%
        400: '#98DDC8', // 75%
        500: '#76d2b6', // 100%
        600: '#4ab79a',
        700: '#309c80',
        800: '#247d68',
        900: '#216455',
        950: '#1d443b',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8971
    'dark-blue': {
        50: '#f4f8fb',
        100: '#e8f0f6',
        200: '#D9E8F0', // 15%
        300: '#B2D1E1', // 30%
        400: '#8CBBD2', // 45%
        500: '#66A4C3', // 60%
        600: '#408EB4', // 75%
        700: '#01689b', // 100%
        800: '#055c87',
        900: '#0b4c6f',
        950: '#07314a',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8995
    'sky-blue': {
        50: '#f2f9fd',
        100: '#D9EBF7', // 15%
        200: '#B2D7EE', // 30%
        300: '#8CC3E6', // 45%
        400: '#66AFDD', // 60%
        500: '#409CD5', // 75%
        600: '#007bc7', // 100%
        700: '#0162a3',
        800: '#065486',
        900: '#0b466f',
        950: '#072c4a',
    },

    // https://www.rijkshuisstijl.nl/publiek/modules/product/DigitalStyleGuide/default/index.aspx?ItemId=8975
    'light-blue': {
        50: '#EEF7FC', // 15%
        100: '#DDEFF8', // 30%
        200: '#CCE7F4', // 45%
        300: '#BCDFF0', // 60%
        400: '#ABD7ED', // 75%
        500: '#8fcae7', // 100%
        600: '#57b0d9',
        700: '#3197c6',
        800: '#2279a7',
        900: '#1c6188',
        950: '#1b5271',
    },
};
