require 'net/http'
require 'uri'

module Jekyll

  class RemoteIncludeParam < Liquid::Tag

    def initialize(tag_name, remote_include, tokens)
      super
      @remote_include = remote_include
    end

    def open(url)
      # print(url + "\n")
      Net::HTTP.get(URI.parse(url.strip)).force_encoding 'utf-8'
    end

    def render(context)
      local_url = nil
      begin
        # some_code
        print("try\n")
        URI.parse((@remote_include).strip)
        open("#{@remote_include}")
      rescue
        # handle_error
        print("catch\n")
        URI.parse(context[@remote_include.strip].strip)
        open("#{context[@remote_include.strip]}")
      end
    end

  end
end

Liquid::Template.register_tag('remote_include_param', Jekyll::RemoteIncludeParam)