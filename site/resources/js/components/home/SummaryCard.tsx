import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Components
import TagLabel from './TagLabel';
import { Title } from '@components/common';

// Hooks
import useUserProfile from '@customHooks/useUserProfile';
import { useShowMessage } from '@customHooks/useShowMessage';

// Others
import { ITags } from '@redux/services/dataApi';
import { MAX_TAGS_COUNT } from '@utils/constants';
import { Location, Verified } from '@assets/icons';
import { IJobData } from '@redux/services/jobsApi';
import { JOB_TYPES } from '@constants/dropdownData';
import { VerificationStatus } from '@redux/services/authApi';
import { IJobSeekerProfile } from '@redux/services/jobSeekerApi';

interface Props {
  item: IJobData | IJobSeekerProfile;
  buttonGroupComponent: React.ReactNode;
}

const SummaryCard = ({ item, buttonGroupComponent }: Props) => {
  const { t, i18n } = useTranslation(['home', 'messages']);
  const { showError } = useShowMessage();

  const { isJobSeeker } = useUserProfile();
  const navigate = useNavigate();

  const isJapanese = i18n.language === 'ja';

  const name = isJobSeeker
    ? (item as IJobData)?.company?.companyName ?? ''
    : (item as IJobSeekerProfile)?.firstName;
  const isVerified =
    item?.user?.verificationStatus === VerificationStatus.APPROVED;

  const handleOpenDetail = () => {
    if (isJobSeeker) {
      const data = item as IJobData;
      if (!data.company) {
        return showError(t('job.noDetail', { ns: 'messages' }));
      }
      return navigate('/home/jobs/details', {
        state: {
          data,
          hideBookmarkButton: false,
        },
      });
    }
    navigate('/home/jobseeker/details', {
      state: {
        data: item as IJobSeekerProfile,
        hideBookmarkButton: false,
      },
    });
  };

  const languageKey = isJapanese ? 'label_ja' : 'label';

  let postedJobType = '',
    jobLocation = '',
    country = '',
    jobSeekerJobType = '',
    tags: ITags[] = [];
  if (isJobSeeker) {
    postedJobType =
      JOB_TYPES.find(jobType => jobType.value === (item as IJobData).jobType)?.[
        languageKey
      ] ?? '';
    const jobLocationData = (item as IJobData)?.jobLocation;
    if (jobLocationData?.[0]) {
      jobLocation = jobLocationData?.[0]?.[languageKey] ?? '';
    }
    tags = (item as IJobData)?.tags;
  } else {
    country = (item as IJobSeekerProfile)?.country;
    jobSeekerJobType =
      JOB_TYPES.find(
        jobType => jobType.value === (item as IJobSeekerProfile)?.jobType,
      )?.[languageKey] ?? '';
    tags = (item as IJobSeekerProfile)?.tags;
  }

  let imageUrl = '';
  if (isJobSeeker) {
    // Each job has 1 image
    imageUrl = (item as IJobData).jobImage;
  } else {
    // imageCount is count of images excluding profile image
    imageUrl = (item as IJobSeekerProfile).profileImg;
  }

  let count = 0;

  return (
    <div
      onClick={() => handleOpenDetail()}
      className="flex gap-2 justify-between w-full bg-white rounded-lg z-50 border border-WHITE_E0E2E4 shadow-sm cursor-pointer">
      <div className="flex flex-col gap-2 justify-between w-full">
        <div className="flex flex-col gap-1 sm:gap-2 p-2 sm:p-3 w-full">
          {!isJobSeeker ? (
            <div className="flex gap-2 items-center">
              <Title type="body2" bold className="text-BLACK_1E2022">
                {name}
              </Title>
              {isVerified ? <Verified width={12} height={12} /> : null}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Title type="body2" className="text-BLACK_1E2022 line-clamp-2">
                {isJapanese
                  ? (item as IJobData)?.jobTitleJa
                  : (item as IJobData)?.jobTitle}
              </Title>
              {isVerified ? <Verified width={12} height={12} /> : null}
            </div>
          )}
          {/* Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {isJobSeeker ? (
              <>
                {jobLocation && (
                  <TagLabel title={jobLocation} icon={Location} />
                )}
                {postedJobType && <TagLabel title={postedJobType} />}
              </>
            ) : (
              <>
                {country && <TagLabel title={country} icon={Location} />}
                {jobSeekerJobType && <TagLabel title={jobSeekerJobType} />}
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {isJobSeeker ? (
              <>
                {tags?.map(preferenceItem => {
                  if (count < MAX_TAGS_COUNT) {
                    count++;
                    return (
                      <TagLabel
                        key={preferenceItem.value}
                        title={
                          isJapanese
                            ? preferenceItem.label_ja
                            : preferenceItem.label
                        }
                      />
                    );
                  }
                })}
              </>
            ) : (
              <>
                {tags?.map(tag => {
                  if (count < MAX_TAGS_COUNT) {
                    count++;
                    return (
                      <TagLabel
                        key={tag.value}
                        title={isJapanese ? tag.label_ja : tag.label}
                      />
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
        <div className="flex self-center pb-2">{buttonGroupComponent}</div>
      </div>
      <img
        src={imageUrl}
        className={
          'hidden sm:flex object-cover w-[120px] h-[160px] rounded-r-lg'
        }
        alt={!isJobSeeker ? `${name}-image` : 'job-image'}
        loading="lazy"
      />
    </div>
  );
};

export default SummaryCard;
