require 'net/http'
require 'uri'

module Jekyll

  class RemoteIncludeParam < Liquid::Tag

    def initialize(tag_name, remote_include, tokens)
      super
      @remote_include = remote_include
    end

    def open(url)
        print(url)
      Net::HTTP.get(URI.parse(url.strip)).force_encoding 'utf-8'
    end

    def render(context)
        print(context[@remote_include])
      open("#{context[@remote_include.strip]}")
    end

  end
end

Liquid::Template.register_tag('remote_include_param', Jekyll::RemoteIncludeParam)