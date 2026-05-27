import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Box, Input, IconButton, Icon } from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="full" position="relative">
      <InputGroup
        flex="1"
        startElement={<Icon as={Search} color="gray.400" />}
        endElement={
          query && (
            <IconButton
              aria-label="Clear search"
              variant="ghost"
              size="sm"
              color="gray.400"
              _hover={{ color: "white" }}
              onClick={clearSearch}
            >
              <Icon as={X} />
            </IconButton>
          )
        }
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          bg="gray.800"
          border="1px solid"
          borderColor="gray.700"
          _focus={{ borderColor: "blue.500", ring: "1px", ringColor: "blue.500" }}
          borderRadius="lg"
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;