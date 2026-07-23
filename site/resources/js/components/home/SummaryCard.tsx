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
      className="group relative flex justify-between w-full bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_-5px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-10px_rgba(0,77,128,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer overflow-hidden z-50">
      <div className="flex flex-col justify-between flex-1 p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          {!isJobSeeker ? (
            <div className="flex gap-2 items-center">
              <Title type="body2" bold className="text-slate-800 tracking-tight text-[17px]">
                {name}
              </Title>
              {isVerified ? (
                <span className="inline-flex items-center justify-center p-0.5 bg-blue-50 text-blue-600 rounded-full">
                  <Verified width={13} height={13} />
                </span>
              ) : null}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Title type="body2" className="text-slate-800 tracking-tight font-bold text-[17px] line-clamp-2">
                {isJapanese
                  ? (item as IJobData)?.jobTitleJa
                  : (item as IJobData)?.jobTitle}
              </Title>
              {isVerified ? (
                <span className="inline-flex items-center justify-center p-0.5 bg-blue-50 text-blue-600 rounded-full">
                  <Verified width={13} height={13} />
                </span>
              ) : null}
            </div>
          )}
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
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
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100/80">
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
        <div className="flex self-center pt-5 sm:pt-4 w-full justify-center">
          {buttonGroupComponent}
        </div>
      </div>
      {imageUrl && (
        <div className="hidden sm:flex relative items-center justify-center m-3 w-[120px] h-[160px] rounded-xl overflow-hidden bg-slate-50 shadow-inner flex-shrink-0">
          <img
            src={imageUrl}
            className="object-cover w-full h-full transform group-hover:scale-[1.06] transition-transform duration-500 ease-out"
            alt={!isJobSeeker ? `${name}-image` : 'job-image'}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
