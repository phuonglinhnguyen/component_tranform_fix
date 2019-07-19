export default {
  upload_configuration_available: 'Upload configuration available',
  create_new_upload_configuration: 'Create new upload configuration',
  header: {
    configuration: 'Configuration'
  },
  lable: {
    upload_configuration_name: 'Upload configuration name',
    destination_folder: 'Destination folder',
    regex_expression: 'Regex expression',
    time_out: 'Time out',
    zip: 'Zip file',
    move_to_folder: 'Move to folder',
    source_info_type: 'Connection type',
    upload_to_folder: 'Upload to folder',
    source_info_host: 'Host',
    source_info_port: 'Port',
    source_info_username: 'Username',
    source_info_password: 'Password',

    source_info_url: 'Url',
    source_info_method: 'Method',
    source_info_args: 'Args',
    source_info_operation_name: 'Operation name'
  },
  hint_text: {
    upload_configuration_name: 'Ex: Upload saga 122',
    destination_folder: 'Ex: /data/122',
    regex_expression: 'Ex: *.js,*.ini',
    time_out: 'Ex: 3000 (3 seconds)',
    move_to_folder: 'Ex: /backup/',
    upload_to_folder: 'Ex: /data_custommer/',
    source_info_host: 'Ex: sftp.customers.vn or 10.10.10.10,...',
    source_info_port: 'Ex: 22',
    source_info_username: 'Ex: user_custommer',
    source_info_password: 'Password',
    source_info_url: 'Ex:http://digi-texx.vn',
    source_info_method: 'Ex: POST',
    source_info_args: 'Ex: {"data_path":"/data/folder"}',
    source_info_operation_name: 'Ex: GetData'
  },
  button: {
    delete: 'Delete',
    deleting: 'Deleting...',
    saving: 'Saving...',
    updating: 'Updating...',
    update: 'Update',
    save_and_create: 'Save and create'
  },
  message: {
    success: {
      save_success: 'Configuration Saved Successfully!',
      update_success: 'Configuration Updated Successfully',
      delete_success: 'Configuration Deleted Successfully'
    },
    error: {
      cant_update: "Can't update configuration",
      cant_delete: "Can't delete configuration",
      not_exist: 'Configuration not exist!'
    }
  }
};
