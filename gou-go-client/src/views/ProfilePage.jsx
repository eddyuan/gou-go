import React, { useState, useContext, useEffect } from 'react';
import { Context } from 'Store';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Empty } from '@douyinfe/semi-ui';
import { IconPlusCircleStroked } from '@douyinfe/semi-icons';
import {
  IllustrationNoContent,
  IllustrationNoContentDark,
} from '@douyinfe/semi-illustrations';
import PetCard from 'components/PetCard';
import server from 'server';
import { BookingCard } from 'components/BookingCard';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [bookings, setBookings] = useState([]);
  const getBookings = () => {
    server
      .getBookings()
      .then((res) => {
        if (res.data?.success) {
          setBookings(res.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {});
  };

  const onBookingDeleted = (booking_id) => {
    setBookings(bookings.filter((x) => x.id !== booking_id));
  };
  useEffect(() => {
    if (!!user.id) {
      getBookings();
    }
  }, []);
  let user = state.user || {};
  if (!user.id) {
    navigate('/');
    return <main className='padded bg-gray'></main>;
  }
  if (user?.id) {
    return (
      <main className='padded profile-page'>
        <div className='container py-6'>
          <div className='profile-hero d-flex-md'>
            <div className='profile-img mb-4'>
              <div className='img-wrapper'>
                <img src={state.user?.profile_img_url} alt='' />
              </div>
            </div>
            <div className='flex-1 pl-md-4'>
              <div className='text-center text-left-md'>
                <h2>
                  {user?.first_name} {user?.last_name}
                </h2>
                <div className='mt-2'>{user.email}</div>
                <div className='mt-2'>{user.address}</div>
              </div>
              <div className='mt-10'>
                <h3 className='mb-4'>Pets</h3>
                {!!user?.pets?.length ? (
                  <>
                    {user.pets.map((pet) => (
                      <PetCard
                        pet={pet}
                        key={pet.id}
                        onDeleted={(id) => getBookings()}
                      />
                    ))}
                    <div className='mt-4'>
                      <Button
                        theme='solid'
                        size='large'
                        type='primary'
                        icon={<IconPlusCircleStroked />}
                        onClick={() => dispatch({ type: 'SHOW_PET' })}
                      >
                        Add pet
                      </Button>
                    </div>
                  </>
                ) : (
                  <Empty
                    image={
                      <IllustrationNoContent
                        style={{ width: 150, height: 150 }}
                      />
                    }
                    darkModeImage={
                      <IllustrationNoContentDark
                        style={{ width: 150, height: 150 }}
                      />
                    }
                    title='No pets'
                    description='You can add a pet'
                  >
                    <div className='text-center'>
                      <Button
                        theme='solid'
                        size='large'
                        type='primary'
                        icon={<IconPlusCircleStroked />}
                        onClick={() => dispatch({ type: 'SHOW_PET' })}
                      >
                        Add pet
                      </Button>
                    </div>
                  </Empty>
                )}
              </div>
              <div className='mt-10'>
                <h3 className='mb-4'>Bookings</h3>
                {!bookings?.length ? (
                  <Empty
                    image={
                      <IllustrationNoContent
                        style={{ width: 150, height: 150 }}
                      />
                    }
                    darkModeImage={
                      <IllustrationNoContentDark
                        style={{ width: 150, height: 150 }}
                      />
                    }
                    title='No Bookings'
                  ></Empty>
                ) : (
                  bookings.map((booking) => (
                    <BookingCard
                      booking={booking}
                      onDeleted={onBookingDeleted}
                      key={booking.id}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default ProfilePage;
