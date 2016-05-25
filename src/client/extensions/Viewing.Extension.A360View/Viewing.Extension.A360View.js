/////////////////////////////////////////////////////////////////////
// Viewing.Extension.A360ViewExtension
// by Philippe Leefsma, April 2016
//
/////////////////////////////////////////////////////////////////////
import Panel from './Viewing.Extension.A360View.Panel'
import ViewerToolkit from 'ViewerToolkit'
import ExtensionBase from 'ExtensionBase'

class A360ViewExtension extends ExtensionBase {

  /////////////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////////////
  constructor(viewer, options) {

    super(viewer, options);
  }

  /////////////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////////////
  static get ExtensionId() {

    return 'Viewing.Extension.A360View';
  }

  /////////////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////////////
  async load() {

    this.control = ViewerToolkit.createButton(
      'a360-view-control',
      'glyphicon glyphicon-retweet',
      'A360 View', ()=>{

        this.panel.toggleVisibility();
      });

    this._options.parentControl.addControl(
      this.control);

    this.panel = new Panel(
      this._viewer.container,
      this.control.container);

    this.onNodeDblClikedHandler = (node) => {

      this.onNodeDblCliked(node)
    }

    this.panel.on('node.dblClick', (node) => {

      this.onNodeDblClikedHandler(node)
    })

    console.log('Viewing.Extension.A360View loaded');

    return true;
  }

  /////////////////////////////////////////////////////////////////
  // Unload callback
  //
  /////////////////////////////////////////////////////////////////
  unload() {

    this._options.parentControl.removeControl(
      this.control);

    console.log('Viewing.Extension.A360View unloaded');

    return true;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  onNodeDblCliked (node) {

    this.emit('load.model', node)
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  A360ViewExtension.ExtensionId,
  A360ViewExtension);
