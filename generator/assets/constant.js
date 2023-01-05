const projectName = "gutenberg_block"

const allKeys = {
  anchor: {
    default: false,
    type: 'boolean'
  },
  align: {
    default: false,
    type: 'booleanOrArray',
  },
  alignWide: {
    default: true,
    type: 'boolean'
  },
  ariaLabel: {
    default: false,
    type: 'boolean'
  },
  className: {
    default: true,
    type: 'boolean'
  },
  color: {
    default: null,
    type: 'object',
    properties: {
      background: {
        type: 'boolean',
        default: true,
      },
      __experimentalDuotone: {
        type: 'string',
        default: undefined,
      },
      gradients: {
        type: 'boolean',
        default: false,
      },
      link: {
        type: 'boolean',
        default: false,
      },
      text: {
        type: 'boolean',
        default: true,
      },
    }
  },
  customClassName: {
    default: true,
    type: 'boolean'
  },
  defaultStylePicker: {
    default: true,
    type: 'boolean'
  },
  html: {
    default: true,
    type: 'boolean'
  },
  inserter: {
    default: true,
    type: 'boolean'
  },
  multiple: {
    default: true,
    type: 'boolean'
  },
  reusable: {
    default: true,
    type: 'boolean'
  },
  lock: {
    default: true,
    type: 'boolean'
  },
  spacing: {
    default: false,
    type: 'object',
    properties: {
      margin: {
        type: 'booleanOrArray',
        default: false
      },
      padding: {
        type: 'booleanOrArray',
        default: false
      },
      blockGap: {
        type: 'booleanOrArray',
        default: false
      },
    }
  },
  typography: {
    default: false,
    type: 'object',
    properties: {
      fontSize: {
        type: 'boolean',
        default: false
      },
      lineHeight: {
        type: 'boolean',
        default: false
      },
    }
  }
}

const allTypes = [
  'null',
  'boolean',
  'object',
  'array',
  'string',
  'number',
  'enum'
]