import { Component } from 'react';
import { SearchBar } from './SearchBar';
import { axiosPixabeyFetch } from 'components/Api/PixabeyApi';
import { SeeMoreBtn } from './SeeMoreBtn';
import { PhotoCard } from './PhotoCard';
import * as basicLightbox from 'basiclightbox';
import { Modal } from './Modal/Modal';
import { PhotoList } from './PhotoList';
import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils';

export class ImageFinder extends Component {
  state = {
    photos: null,
    currentRequest: '',
    page: 1,
    renderSeeMoreBtn: false,
    totalHits: null,
  };

  newRequest = ({ event, searchReq }) => {
    event.preventDefault();
    this.setState({ currentRequest: searchReq });
  };

  loadPhotos = async () => {
    const newData = await axiosPixabeyFetch(
      this.state.currentRequest,
      this.state.page
    );
    this.setState({ totalHits: newData.totalHits });
    console.log(`newData.totalHits:`, newData.totalHits);
    const newPhotos = newData.hits;
    this.addNewPhotosToState(newPhotos);
  };

  addNewPhotosToState = newPhotos => {
    this.setState({
      photos: [...(this.state.photos ?? []), ...newPhotos],
      page: this.state.page + 1,
    });
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.currentRequest !== this.state.currentRequest) {
      this.loadPhotos();
      this.setState({ photos: null, page: 1 });
    }
    if (
      this.state.page > 1 &&
      this.state.totalHits / 12 > this.state.page &&
      this.state.renderSeeMoreBtn !== true
    ) {
      this.setState({ renderSeeMoreBtn: true });
    } else if (
      this.state.renderSeeMoreBtn === true &&
      this.state.totalHits / 12 < this.state.page
    ) {
      this.setState({ renderSeeMoreBtn: false });
    }
  };

  render() {
    const canRanderPhotos =
      Array.isArray(this.state.photos) && this.state.photos.length !== 0;
    return (
      <>
        <SearchBar onSubmit={this.newRequest} />
        {canRanderPhotos && <PhotoList photos={this.state.photos} />}
        {this.state.renderSeeMoreBtn && (
          <SeeMoreBtn onSeeMore={this.loadPhotos} />
        )}
      </>
    );
  }
}
