import React, { Suspense, lazy, useEffect, useState } from 'react';

import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

// Components
import { DashboardWrapper } from '@templates';
import { SummaryCard } from '@components/home';
import { CustomButton, Title } from '@components/common';
import { SubscribeModal } from '@components/subscription';

const FilterCompany = lazy(() => import('./FilterCompany'));
const FilterJobSeeker = lazy(() => import('./FilterJobSeeker'));
const MatchModal = lazy(() => import('@components/home/MatchModal'));
const DirectChatModal = lazy(() => import('@components/home/DirectChatModal'));

// Hooks
import useCompany from '@customHooks/useCompany';
import useJobSeeker from '@customHooks/useJobSeeker';
import useUserProfile from '@customHooks/useUserProfile';
import useMatchingJobs from '@customHooks/useMatchingJobs';
import { useShowMessage } from '@customHooks/useShowMessage';
import useSwipeMatching from '@customHooks/useSwipeMatching';
import useMatchingJobSeekers from '@customHooks/useMatchingJobSeekers';

// Redux
import {
  addLeftSwipedItem,
  filterHomeData,
  undoLeftSwipedItem,
} from '@redux/reducers/home';
import {
  IChatRequestParams,
  IFavoriteMatchingParams,
  IRequestMatchingParams,
  IRewindParams,
  useFavoriteMatchingMutation,
  useRewindMutation,
} from '@redux/services/matchingApi';
import { IJobData } from '@redux/services/jobsApi';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { setMatchingLimit } from '@redux/reducers/subscription';
import { IJobSeekerProfile } from '@redux/services/jobSeekerApi';
import { setNeedsBookmarkRefresh } from '@redux/reducers/bookmark';

// Others
import {
  ArrowBack,
  BookmarkCircle,
  ChatRequest,
  CheckGreen,
  CloseCircle,
  Filter,
} from '@assets/icons';

const HomeScreen = () => {
  const { t } = useTranslation(['home', 'messages']);
  const { showSuccess } = useShowMessage();
  const { isJobSeeker, isSubscribed } = useUserProfile();
  const {
    chatRequestCount,
    chatRequestLimit,
    dailyCount,
    dailyLimit,
    favoriteLimit,
  } = useAppSelector(state => state.subscription);
  const {
    homeData: data,
    isMatchingModalVisible,
    leftSwipedItems,
  } = useAppSelector(state => state.home);
  const dispatch = useAppDispatch();

  const [isFilterModalVisible, setFilterModalVisible] =
    useState<boolean>(false);
  const [isSubscriptionModalVisible, setSubscriptionModalVisible] =
    useState<boolean>(false);
  const [isDirectChatModalVisible, setDirectChatModalVisible] =
    useState<boolean>(false);
  const [directChatModalData, setDirectChatModalData] =
    useState<IChatRequestParams>({});

  // Save swipe data to queue and fire api when user stops for 500ms
  const {
    swipeCount,
    setSwipeCount,
    addItemToQueue,
    isUndoAllowed,
    setUndoAllowed,
    isSwipeLoading,
  } = useSwipeMatching();

  const [
    matchFavorite,
    {
      isLoading: isFavoriteLoading,
      isSuccess: isFavoriteSuccess,
      data: favoriteData,
      originalArgs: favoriteOriginalArgs,
    },
  ] = useFavoriteMatchingMutation();

  const [rewindFeed, { isLoading: isRewindLoading }] = useRewindMutation();

  const useMatchingData = isJobSeeker ? useMatchingJobs : useMatchingJobSeekers;
  const useFetchUserData = isJobSeeker ? useJobSeeker : useCompany;
  useFetchUserData();

  const {
    isLoading,
    isFetchingMore,
    fetchMore,
    perPage,
    hasMorePage,
    resetAndFetch,
  } = useMatchingData();

  // Swipe card right after item is set to favorite
  useEffect(() => {
    if (isFavoriteSuccess) {
      const dailyCount = favoriteData?.data?.dailyCount ?? 0;
      setSwipeCount(dailyCount);
      dispatch(
        setMatchingLimit({
          dailyCount: dailyCount,
          favoriteCount: favoriteData?.data?.favouriteCount,
        }),
      );
      const dataId = isJobSeeker
        ? favoriteOriginalArgs?.job_id
        : favoriteOriginalArgs?.job_seeker_id;
      dataId && dispatch(filterHomeData(dataId));
      dispatch(setNeedsBookmarkRefresh(true));
      showSuccess(t('favorite.success', { ns: 'messages' }));
    }
  }, [isFavoriteSuccess]);

  // Fetch more when last 2 items remain
  useEffect(() => {
    if (hasMorePage && data.length === perPage - 3) {
      fetchMore();
    }
  }, [data.length]);

  // Function to be called on chat request success
  const handleDirectChatSuccess = () => {
    dispatch(setNeedsBookmarkRefresh(true));
  };

  /**
   * Reset all left swiped items from db and show them again
   */
  const handleResetList = () => {
    setUndoAllowed(false);
    resetAndFetch();
  };

  /**
   * Swipe right
   * If user is unsubscribed user and limit is crossed, swipe back the card and show subscription modal.
   * If user swipes right, send type 1 with
   * 1. job_id for jobseeker user
   * 2. job_seeker_id for company user
   * @param feedId id of current feed  item
   * @returns
   */
  const handleSwipeRight = (feedId: string) => {
    if (!isSubscribed && dailyCount >= dailyLimit) {
      return setSubscriptionModalVisible(true);
    }
    const params: IRequestMatchingParams = { type: 1 };
    if (isJobSeeker) {
      params.job_id = feedId;
    } else {
      params.job_seeker_id = feedId;
    }
    addItemToQueue(params);
    dispatch(filterHomeData(feedId));
  };

  /**
   * Swipe left
   * If user swipes left, send type 0 with
   * 1. job_id for jobseeker user
   * 2. job_seeker_id for company user
   * @param feedId
   */
  const handleSwipeLeft = (feedId: string) => {
    const params: IRequestMatchingParams = { type: 0 };
    if (isJobSeeker) {
      params.job_id = feedId;
    } else {
      params.job_seeker_id = feedId;
    }
    addItemToQueue(params);
    dispatch(addLeftSwipedItem(feedId));
    dispatch(filterHomeData(feedId));
  };

  const handleBoomark = (item: IJobData | IJobSeekerProfile) => {
    const favCount = favoriteData?.data?.favouriteCount ?? 0;
    if (
      !isSubscribed &&
      (swipeCount >= dailyLimit || favCount >= favoriteLimit)
    ) {
      return setSubscriptionModalVisible(true);
    }
    const params: IFavoriteMatchingParams = {
      favourite: 1,
    };
    if (isJobSeeker) {
      params.job_id = (item as IJobData)?.id;
    } else {
      params.job_seeker_id = (item as IJobSeekerProfile)?.id;
    }
    matchFavorite(params);
  };

  const handleChatRequest = (item: IJobData | IJobSeekerProfile) => {
    if (!isSubscribed && chatRequestCount >= chatRequestLimit) {
      return setSubscriptionModalVisible(true);
    }
    const requestParams: IChatRequestParams = {};
    if (isJobSeeker) {
      requestParams.job_id = (item as IJobData)?.id;
    } else {
      requestParams.job_seeker_id = (item as IJobSeekerProfile)?.id;
    }
    setDirectChatModalData(requestParams);
    setDirectChatModalVisible(true);
  };

  // If currentIndex is less than data length, then there is data left to be showed.
  // Current index will always be 0 because we will remove the item from list once any matching function is done.
  const currentIndex = 0;
  const isDataRemaining = currentIndex < data.length;

  return (
    <DashboardWrapper>
      {isFavoriteLoading && <Spin fullscreen />}
      <div className="flex flex-col gap-4 justify-center w-full">
        {!isLoading && (
          <div className="sticky w-full top-0 pb-2 flex gap-4 justify-between bg-white z-[100]">
            <button
              onClick={() => {
                const feedToBeRewind = leftSwipedItems?.[0]?.id;
                let params: IRewindParams = {};
                if (isJobSeeker) {
                  params = {
                    job_id: feedToBeRewind,
                  };
                } else {
                  params = {
                    job_seeker_id: feedToBeRewind,
                  };
                }
                rewindFeed(params);
                // Set last left swiped item to data list and remove from left swiped list.
                dispatch(undoLeftSwipedItem());
                // Set undo false if no items are left for undo
                if (leftSwipedItems.length <= 1) {
                  setUndoAllowed(false);
                }
              }}
              disabled={!isUndoAllowed || isRewindLoading}
              className={`${isUndoAllowed ? '' : 'opacity-50 cursor-not-allowed'} hover:bg-WHITE_F6F6F6`}>
              <ArrowBack
                width={36}
                height={36}
                className="w-6 h-6 sm:w-9 sm:h-9"
              />
            </button>
            <button
              onClick={() => setFilterModalVisible(true)}
              className="hover:bg-WHITE_F6F6F6">
              <Filter width={20} height={20} />
            </button>
          </div>
        )}
        {isLoading ? (
          <Spin className="flex items-center" />
        ) : (
          <div
            className={`flex flex-col w-full h-full pb-4 gap-3 ${isDataRemaining ? '' : 'justify-center'}`}>
            {isDataRemaining ? (
              data.map(item => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 w-full items-center">
                    {/* Card */}
                    <SummaryCard
                      item={item as IJobData | IJobSeekerProfile}
                      buttonGroupComponent={
                        <div className="flex gap-4 items-center self-center w-full">
                          {/* Left Swipe ( CROSS Button ) */}
                          <button
                            className="hover:shadow-lg rounded-full"
                            onClick={e => {
                              e.stopPropagation();
                              const feedDataId = item?.id;
                              if (feedDataId) {
                                handleSwipeLeft(feedDataId);
                              }
                            }}>
                            <CloseCircle className="w-8 h-8 sm:w-9 sm:h-12" />
                          </button>
                          {/* Favorite / Bookmark */}
                          <button
                            className="hover:shadow-lg rounded-full"
                            onClick={e => {
                              e.stopPropagation();
                              handleBoomark(item);
                            }}>
                            <BookmarkCircle className="w-8 h-8 sm:w-9 sm:h-12" />
                          </button>
                          {/* Chat Request */}
                          <button
                            className="hover:shadow-lg rounded-full"
                            onClick={e => {
                              e.stopPropagation();
                              handleChatRequest(item);
                            }}>
                            <ChatRequest className="w-8 h-8 sm:w-9 sm:h-12" />
                          </button>
                          {/* Right Swipe ( CHECKMARK Button ) */}
                          <button
                            className="hover:shadow-lg rounded-full"
                            onClick={e => {
                              e.stopPropagation();
                              if (!isSubscribed && swipeCount >= dailyLimit) {
                                return setSubscriptionModalVisible(true);
                              }
                              const feedDataId = item?.id;
                              if (feedDataId) {
                                handleSwipeRight(feedDataId);
                              }
                            }}>
                            <CheckGreen className="w-8 h-8 sm:w-9 sm:h-12" />
                          </button>
                        </div>
                      }
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center p-6">
                {isFetchingMore ? (
                  <Spin />
                ) : (
                  <>
                    {/* View More */}
                    <Title
                      type="body1"
                      className="text-center leading-6 font-semibold">
                      {t('outOfUsers')}
                    </Title>
                    {!hasMorePage && (
                      <CustomButton
                        title={t('viewMore', { ns: 'common' })}
                        disabled={isSwipeLoading}
                        loading={isFetchingMore}
                        onClick={() => handleResetList()}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {isFilterModalVisible &&
        (isJobSeeker ? (
          <Suspense fallback={<Spin />}>
            <FilterCompany setModalVisible={setFilterModalVisible} />
          </Suspense>
        ) : (
          <Suspense fallback={<Spin />}>
            <FilterJobSeeker setModalVisible={setFilterModalVisible} />
          </Suspense>
        ))}

      {/* Subscription Modal */}
      {isSubscriptionModalVisible && (
        <Suspense fallback={<Spin />}>
          <SubscribeModal
            closeModal={() => setSubscriptionModalVisible(false)}
          />
        </Suspense>
      )}

      {/* Direct Chat Request Modal */}
      {isDirectChatModalVisible && (
        <Suspense fallback={<Spin />}>
          <DirectChatModal
            closeModal={() => {
              setDirectChatModalData({});
              setDirectChatModalVisible(false);
            }}
            chatRequestData={directChatModalData}
            setDirectChatSuccess={() => handleDirectChatSuccess()}
          />
        </Suspense>
      )}

      {/* Matched Modal */}
      {isMatchingModalVisible && (
        <Suspense fallback={<Spin />}>
          <MatchModal />
        </Suspense>
      )}
    </DashboardWrapper>
  );
};

export default HomeScreen;
