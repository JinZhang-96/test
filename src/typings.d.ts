/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface WebpackRequire {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

interface NodeRequire extends WebpackRequire {}

declare var require: NodeRequire;
declare var System: any;
declare var tinymce: any;
declare var Prism: any;
declare var G2: any;
declare var $: any;
