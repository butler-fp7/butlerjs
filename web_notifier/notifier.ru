require 'faye'
require File.dirname(__FILE__) + '/config.rb'

Faye::WebSocket.load_adapter('thin')

class ServerAuth
  def incoming(message, callback)
    # Let non-subscribe messages through
    puts "===>#{message}"
    unless message['channel'].start_with?('/messages/')
    #unless message['channel'] == '/meta/subscribe' || message['channel'].start_with?('/messages')
      return callback.call(message)
    end

    msg_token = message['ext'] && message['ext']['authToken']

    # Add an error if the tokens don't match
    if msg_token != TOKEN
      message['error'] = 'Invalid subscription auth token'
    end

    # Call the server back now we're done
    callback.call(message)
  end
end

bayeux = Faye::RackAdapter.new(:mount => MOUNT_POINT, :timeout => 25)
bayeux.add_extension(ServerAuth.new)
run bayeux
