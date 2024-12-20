import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Autocomplete, InputAdornment, Link, Typography } from '@mui/material';
import axios from 'axios';
import { IBlogPost } from 'src/@types/blog';
import { CustomTextField } from 'src/components/custom-input';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import SearchNotFound from 'src/components/search-not-found';
import { PATH_DASHBOARD } from 'src/routes/paths';
// utils

// ----------------------------------------------------------------------

export default function BlogPostsSearch() {
  const navigate = useNavigate();

  const [searchPosts, setSearchPosts] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchPosts = async (value: string) => {
    try {
      setSearchPosts(value);
      if (value) {
        const response = await axios.get('/api/blog/posts/search', {
          params: { query: value },
        });

        setSearchResults(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (title: string) => {
    navigate(PATH_DASHBOARD.question.view(paramCase(title)));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick(searchPosts);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => handleSearchPosts(value)}
      getOptionLabel={(post: IBlogPost) => post.title}
      noOptionsText={<SearchNotFound query={searchPosts} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const { title, cover } = post;
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        return (
          <li {...props}>
            <Image
              alt={cover}
              src={cover}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />

            <Link underline="none" onClick={() => handleClick(title)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
