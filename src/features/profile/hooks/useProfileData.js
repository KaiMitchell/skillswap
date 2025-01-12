import { useState, useEffect } from 'react';

function useProfileData(apiEndpoint, method) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let fetchArgs;

  useEffect(() => {

    (async () => {

        try {

            const response = await fetch(apiEndpoint);
            const data = await response.json();
    
            setProfileData(data);
            setLoading(false);

        } catch(err) {

            setError(err);
            setLoading(false);

        };
    });

  }, [apiEndpoint]);

  return { profileData, loading, error };
};

export default useProfileData;
