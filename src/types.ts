import { PluginOptions } from './babel/utils/loadOptions';
import { RawSourceMap } from 'source-map';

export type Replacement = {
  original: { start: Location; end: Location };
  length: number;
};

export type Location = {
  line: number;
  column: number;
};

export type Rules = {
  [className: string]: {
    cssText: string;
    displayName: string;
    start: Location | null;
  };
};

export type Result = {
  code: string;
  sourceMap?: RawSourceMap | null;
  cssText?: string;
  cssSourceMapText?: string;
  dependencies?: string[];
  rules?: Rules;
  replacements?: Replacement[];
};

export type LinariaMetadata = {
  rules: Rules;
  replacements: Replacement[];
  dependencies: string[];
};

export type Options = {
  filename: string;
  preprocessor?: Preprocessor;
  outputFilename?: string;
  inputSourceMap?: RawSourceMap;
  pluginOptions?: Partial<PluginOptions>;
};

export type CSSMeta = {
  displayName: string | null;
  __linaria: {
    type: 'css';
    className: string;
    composes: {
      styles: string;
      replacements: { [key: string]: Function | Object };
    };
  };
};

export type StyledMeta = {
  displayName: string | null;
  __linaria: {
    type: 'styled';
    className: string;
    composes: CSSMeta | Array<CSSMeta> | null;
    extends: StyledMeta | null;
  };
};

export type DefinitionMeta = CSSMeta | StyledMeta;
export type PreprocessorFn = (selector: string, cssText: string) => string;
export type Preprocessor = 'none' | 'stylis' | PreprocessorFn | void;
