Ext.define('Rambox.view.preferences.Preferences',{
	 extend: 'Ext.window.Window'
	,xtype: 'preferences'

	,requires: [
		 'Rambox.view.preferences.PreferencesController'
		,'Rambox.view.preferences.PreferencesModel'
		,'Ext.form.field.ComboBox'
		,'Ext.form.field.Checkbox'
	]

	,controller: 'preferences-preferences'
	,viewModel: {
		type: 'preferences-preferences'
	}

	,title: locale['preferences[0]']
	,width: 420
	,modal: true
	,closable: true
	,minimizable: false
	,maximizable: false
	,draggable: true
	,resizable: false
	,buttons: [
		{
			 text: locale['button[1]']
			,ui: 'decline'
			,handler: 'cancel'
		}
		,'->'
		,{
			 text: locale['button[4]']
			,handler: 'save'
		}
	]

	,initComponent: function() {
		var config = ipc.sendSync('getConfig');

		var defaultServiceOptions = [];
		defaultServiceOptions.push({ value: 'ramboxTab', label: 'Rambox-OS Tab' });
		defaultServiceOptions.push({ value: 'last', label: 'Last Active Service' });
		Ext.getStore('Services').each(function(rec) {
			defaultServiceOptions.push({
				 value: rec.get('id')
				,label: rec.get('name')
			});
		});

		this.items = [
			{
				 xtype: 'form'
				,bodyPadding: 20
				,items: [
					{
						xtype: 'container'
						,layout: 'hbox'
						,items: [
							{
								 xtype: 'combo'
								,name: 'locale'
								,fieldLabel: 'Language'
								,labelAlign: 'left'
								,flex: 1
								,labelWidth: 80
								,value: config.locale
								,displayField: 'label'
								,valueField: 'value'
								,editable: false
								,store: Ext.create('Ext.data.Store', {
									 fields: ['value', 'label']
									,data: [
										 { 'value': 'af', 'auth0': 'af', 'label': 'Afrikaans' }
										,{ 'value': 'ar', 'auth0': 'en', 'label': 'Arabic' }
										,{ 'value': 'bs2', 'auth0': 'en', 'label': 'Barndutsch, Switzerland' }
										,{ 'value': 'bn', 'auth0': 'en', 'label': 'Bengali' }
										,{ 'value': 'bg', 'auth0': 'en', 'label': 'Bulgarian' }
										,{ 'value': 'ca', 'auth0': 'ca', 'label': 'Catalan' }
										,{ 'value': 'zh-CN', 'auth0': 'zh', 'label': 'Chinese Simplified' }
										,{ 'value': 'zh-TW', 'auth0': 'zh-tw', 'label': 'Chinese Traditional' }
										,{ 'value': 'hr', 'auth0': 'en', 'label': 'Croatian' }
										,{ 'value': 'cs', 'auth0': 'cs', 'label': 'Czech' }
										,{ 'value': 'da', 'auth0': 'da', 'label': 'Danish' }
										,{ 'value': 'nl', 'auth0': 'nl', 'label': 'Dutch' }
										,{ 'value': 'en', 'auth0': 'en', 'label': 'English' }
										,{ 'value': 'fi', 'auth0': 'fi', 'label': 'Finnish' }
										,{ 'value': 'fr', 'auth0': 'fr', 'label': 'French' }
										,{ 'value': 'de', 'auth0': 'de', 'label': 'German' }
										,{ 'value': 'de-CH', 'auth0': 'de', 'label': 'German, Switzerland' }
										,{ 'value': 'el', 'auth0': 'en', 'label': 'Greek' }
										,{ 'value': 'he', 'auth0': 'en', 'label': 'Hebrew' }
										,{ 'value': 'hi', 'auth0': 'en', 'label': 'Hindi' }
										,{ 'value': 'hu', 'auth0': 'hu', 'label': 'Hungarian' }
										,{ 'value': 'id', 'auth0': 'en', 'label': 'Indonesian' }
										,{ 'value': 'it', 'auth0': 'it', 'label': 'Italian' }
										,{ 'value': 'ja', 'auth0': 'ja', 'label': 'Japanese' }
										,{ 'value': 'ko', 'auth0': 'ko', 'label': 'Korean' }
										,{ 'value': 'no', 'auth0': 'no', 'label': 'Norwegian' }
										,{ 'value': 'fa', 'auth0': 'fa', 'label': 'Persian' }
										,{ 'value': 'pl', 'auth0': 'pl', 'label': 'Polish' }
										,{ 'value': 'pt-PT', 'auth0': 'pt-br', 'label': 'Portuguese' }
										,{ 'value': 'pt-BR', 'auth0': 'pt-br', 'label': 'Portuguese (Brazilian)' }
										,{ 'value': 'ro', 'auth0': 'ro', 'label': 'Romanian' }
										,{ 'value': 'ru', 'auth0': 'ru', 'label': 'Russian' }
										,{ 'value': 'sr', 'auth0': 'en', 'label': 'Serbian (Cyrillic)' }
										,{ 'value': 'sk', 'auth0': 'sk', 'label': 'Slovak' }
										,{ 'value': 'es-ES', 'auth0': 'es', 'label': 'Spanish' }
										,{ 'value': 'sv-SE', 'auth0': 'sv', 'label': 'Swedish' }
										,{ 'value': 'tr', 'auth0': 'tr', 'label': 'Turkish' }
										,{ 'value': 'uk', 'auth0': 'en', 'label': 'Ukrainian' }
										,{ 'value': 'vi', 'auth0': 'en', 'label': 'Vietnamese' }
									]
								})
							}
							,{
								 xtype: 'button'
								,text: 'Help us Translate'
								,style: 'border-top-left-radius:0;border-bottom-left-radius:0;'
								,href: 'https://crowdin.com/project/rambox/invite'
							}
						]
					}
					,{
						 xtype: 'label'
						,text: 'English is the only language that has full translation. We are working with all the others, help us!'
						,style: 'display:block;font-size:10px;line-height:15px;'
						,margin: '0 0 10 0'
					}
					,{
						 xtype: 'checkbox'
						,name: 'auto_launch'
						,boxLabel: locale['preferences[5]']
						,value: config.auto_launch
					}
					,{
						 xtype: 'checkbox'
						,name: 'start_minimized'
						,boxLabel: locale['preferences[4]']
						,value: config.start_minimized
					}
					,{
						 xtype: 'checkbox'
						,name: 'hide_menu_bar'
						,boxLabel: locale['preferences[1]']+' (<code>Alt</code> key to display)'
						,value: config.hide_menu_bar
						,hidden: process.platform === 'darwin'
					}
					,{
						 xtype: 'combo'
						,name: 'tabbar_location'
						,fieldLabel: 'Service bar location'
						,labelAlign: 'left'
						,width: 380
						,labelWidth: 180
						,value: config.tabbar_location
						,displayField: 'label'
						,valueField: 'value'
						,editable: false
						,store: Ext.create('Ext.data.Store', {
							 fields: ['value', 'label']
							,data: [
								 { 'value': 'top', 'label': 'Top' }
								,{ 'value': 'left', 'label': 'Left' }
								,{ 'value': 'bottom', 'label': 'Bottom' }
								,{ 'value': 'right', 'label': 'Right' }
							]
						})
					}
					,{
						 xtype: 'combo'
						,name: 'default_service'
						,fieldLabel: 'Default service to display when Rambox-OS starts'
						,labelAlign: 'top'
						//,width: 380
						//,labelWidth: 105
						,value: config.default_service
						,displayField: 'label'
						,valueField: 'value'
						,editable: false
						,store: Ext.create('Ext.data.Store', {
							 fields: ['value', 'label']
							,data: defaultServiceOptions
						})
					}
					,{
						 xtype: 'combo'
						,name: 'window_display_behavior'
						,fieldLabel: 'Display behaviour'
						,labelAlign: 'left'
						,width: 380
						,labelWidth: 105
						,value: config.window_display_behavior
						,displayField: 'label'
						,valueField: 'value'
						,editable: false
						,store: Ext.create('Ext.data.Store', {
							 fields: ['value', 'label']
							,data: [
								 { 'value': 'show_taskbar', 'label': 'Show in Taskbar' }
								,{ 'value': 'show_trayIcon', 'label': 'Show Tray Icon' }
								,{ 'value': 'taskbar_tray', 'label': 'Show in Taskbar and Tray Icon' }
							]
						})
						,hidden: process.platform === 'darwin'
					}
					,{
						 xtype: 'combo'
						,name: 'window_close_behavior'
						,fieldLabel: 'When closing the main window'
						,labelAlign: 'left'
						,width: 380
						,labelWidth: 180
						,value: config.window_close_behavior
						,displayField: 'label'
						,valueField: 'value'
						,editable: false
						,store: Ext.create('Ext.data.Store', {
							 fields: ['value', 'label']
							,data: [
								 { 'value': 'keep_in_tray', 'label': 'Keep in tray' }
								,{ 'value': 'keep_in_tray_and_taskbar', 'label': 'Keep in tray and/or taskbar' }
								,{ 'value': 'quit', 'label': 'Quit' }
							]
						})
						,hidden: process.platform === 'darwin'
					}
					,{
						 xtype: 'checkbox'
						,name: 'always_on_top'
						,boxLabel: 'Always on top'
						,value: config.always_on_top
					}
					,{
						 xtype: 'checkbox'
						,name: 'systemtray_indicator'
						,boxLabel: 'Show System Tray indicator on unread messages'
						,value: config.systemtray_indicator
						,hidden: process.platform === 'darwin'
					}
					,{
						 xtype: 'checkbox'
						,name: 'flash_frame'
						,boxLabel: process.platform === 'darwin' ? locale['preferences[10]'] : locale['preferences[9]']
						,value: config.flash_frame
					}
					,{
						 xtype: 'checkbox'
						,name: 'disable_gpu'
						,boxLabel: 'Disable Hardware Acceleration (needs to relaunch)'
						,value: config.disable_gpu
					}
					,{
						 xtype: 'checkbox'
						,name: 'enable_hidpi_support'
						,boxLabel: locale['preferences[8]']
						,value: config.enable_hidpi_support
						,hidden: process.platform !== 'win32'
					}
					,{
						 xtype: 'fieldset'
						,title: 'Master Password - Ask for password on startup'
						,collapsed: !config.master_password
						,checkboxToggle: true
						,checkboxName: 'master_password'
						,margin: '10 0 0 0'
						,padding: 10
						,layout: 'hbox'
						,defaults: { labelAlign: 'top' }
						,items: [
							{
								 xtype: 'textfield'
								,inputType: 'password'
								,fieldLabel: 'Password'
								,name: 'master_password1'
								,itemId: 'pass'
								,flex: 1
								,listeners: {
									validitychange: function(field) {
										field.next().validate();
									},
									blur: function(field) {
										field.next().validate();
									}
								}
							}
							,{
								 xtype: 'textfield'
								,inputType: 'password'
								,fieldLabel: 'Repeat Password'
								,name: 'master_password2'
								,margin: '0 0 0 10'
								,vtype: 'password'
								,initialPassField: 'pass'
								,flex: 1
							}
						]
					}
					,{
						 xtype: 'fieldset'
						,title: 'Proxy (needs to relaunch) - <a href="https://github.com/TheGoddessInari/rambox/wiki/FREE-PROXY-SERVERS" target="_blank">Free Proxy Servers</a>'
						,collapsed: !config.proxy
						,checkboxToggle: true
						,checkboxName: 'proxy'
						,margin: '10 0 0 0'
						,padding: 10
						,layout: 'vbox'
						,defaults: { labelAlign: 'left' }
						,items: [
							{
								 xtype: 'textfield'
								,vtype: 'url'
								,fieldLabel: 'Host'
								,name: 'proxyHost'
								,value: config.proxyHost
								//,flex: 1
							}
							,{
								 xtype: 'numberfield'
								,fieldLabel: 'Port'
								,name: 'proxyPort'
								,value: config.proxyPort
							}
							,{
								 xtype: 'textfield'
								,fieldLabel: 'Login'
								,name: 'proxyLogin'
								,value: config.proxyLogin
								,emptyText: 'Optional'
							}
							,{
								 xtype: 'textfield'
								,fieldLabel: 'Password'
								,name: 'proxyPassword'
								,value: config.proxyPassword
								,emptyText: 'Optional'
							}
						]
					}
				]
			}
		];

		this.callParent();
	}
});
