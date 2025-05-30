import PropTypes from 'prop-types';

import { Button } from '@patternfly/react-core';

import { HttpClient } from '../services/http';

const DownloadButton = ({ url, filename, children, ...rest }) => {
  if (!filename) {
    filename = url.split('/').pop();
  }

  const handleClick = () => {
    HttpClient.get(url)
      .then((response) => response.blob())
      .then((blob) => {
        const href = URL.createObjectURL(blob);
        const aElement = document.createElement('a');
        aElement.setAttribute('href', href);
        aElement.setAttribute('download', filename);
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
  };

  return (
    <Button onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};

DownloadButton.propTypes = {
  url: PropTypes.string,
  filename: PropTypes.string,
  children: PropTypes.node,
};

export default DownloadButton;
